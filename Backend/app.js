// So This is a open source backend code that's why i am writing comment here
// Let's Gooooooooooooooooo..............

import express from "express";
import dotenv from "dotenv";
import { createClient } from "redis";
import randomstring from "randomstring";
import WebSocket, { WebSocketServer } from "ws";
import cors from "cors"
import users from "./Controllers/user.js"
import url from "url"
import querystring from "querystring";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()
const app = express();
const httpserver = app.listen(9000);
dotenv.config();

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET
console.log(JWT_SECRET)

const client = createClient();

client.on("error", (error) => {
  console.log(
    `Something went wrong while creating the user and the error is : ${error}`
  );
});

const wss = new WebSocketServer({ server: httpserver });

let rooms = {};

let usersMap = new Map();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST"]
}))

app.use("/v1/googleAuth",users)

wss.on("connection", (ws,req) => {

  const parsedUrl = url.parse(req.url);
  const queryParams = querystring.parse(parsedUrl.query);
  const token = queryParams.token;
  
  console.log("Token value is " + token)

  console.log("Incoming connection:", req.url);
  console.log("Extracted token:", token);

  if (!token) {
    ws.close(4001, "Unauthorized");
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.userId) {
      ws.close(4003, "Invalid payload");
      return;
    }
  } catch (err) {
    console.log("JWT verification failed:", err);
    ws.close(4002, "Invalid token");
    return;
  }


  ws.on("message", async (userValue) => {
    console.log("Connected to the server");
    let message = JSON.parse(userValue);
    let myMessage = message.msg;
    let roomId = message.roomId;
    let userId = message.userId;
    
    console.log("user id is :" + userId)

    if(myMessage === "JOIN_ROOM") {
      console.log("Joined the room")
      usersMap.set(userId, ws);

      try {
        let setKey = "set_key";
        let lKey = "list_key";

        let setInsertion = await client.sIsMember(setKey, userId);

        await client.sAdd(setKey, userId);
        await client.rPush(lKey, userId);

        let length_of_list = await client.lLen(lKey);

        if (length_of_list >= 2) {
          let first_user = await client.lPop(lKey);
          let second_user = await client.lPop(lKey);
          await client.sRem(setKey, first_user);
          await client.sRem(setKey, second_user);

          const roomId = randomstring.generate(12);

          rooms[roomId] = [first_user, second_user];

          const ws1 = usersMap.get(first_user);
          const ws2 = usersMap.get(second_user);

          const payload = {
            type: "ROOM_CREATED",
            roomId,
            peers: [first_user, second_user],
          };

          console.log(JSON.stringify(payload))

          if (ws1 && ws1.readyState === WebSocket.OPEN) {
            ws1.send(
              JSON.stringify({ userId: userId, msg: "JOIN_ROOM", payload })
            );
          }

          if (ws2 && ws2.readyState === WebSocket.OPEN) {
            ws2.send(
              JSON.stringify({ userId: userId, msg: "JOIN_ROOM", payload })
            );
          }

          console.log(
            `Paired ${first_user} and ${second_user} into room ${roomId}`
          );
        }
      }
      catch (error) {
        console.log(
          `Something went wrong while adding the users to the queue` + error
        );
      }
    } 
    
    else if (myMessage === "SENDMESSAGE") {
      let textData = message.textbyuser;
      console.log("message is " + textData + "by userid " + userId);
      if(rooms[roomId]){
        console.log("aandar to aa gye guru");
        rooms[roomId].forEach((userIdInRoom) => {
          const userSocket = usersMap.get(userIdInRoom);
          if(userSocket && userSocket.readyState === WebSocket.OPEN){
            console.log("message is sending")
            userSocket.send(JSON.stringify({msg: myMessage,roomId,userId,textbyuser: textData,}))
          }
        });
      }
      return;
    }
  });

  ws.send("Someone send the message");
});

app.get("/", (req, res) => {
  return res.json({ msg: "Welcome to the red chat" });
});

app.get("/getqueueValues", async (req, res) => {
  try {
    let addedUser = await client.SMEMBERS("userid");
    return res.json({ users: addedUser });
  } catch (error) {
    console.log(
      `Something went wrong while adding the users to the queue` + error
    );
  }
});

const serverCreation = async () => {
  try {
    await client.connect();
    console.log("Successfully connected to the redis");
    console.log(`Server is running on the PORT number ${PORT}`);
  } catch (error) {
    console.log("Something went wrong while creating the user " + error);
  }
};

serverCreation();
