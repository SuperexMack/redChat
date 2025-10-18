
// So This is a open source backend code that's why i am writing comment here
// Let's Gooooooooooooooooo..............

import express from "express"
import dotenv from "dotenv"
import { createClient } from "redis"
import randomstring from "randomstring";
import WebSocket, { WebSocketServer } from 'ws';
const app = express()
const httpserver = app.listen(9000)
dotenv.config()

const PORT = process.env.PORT

const client  = createClient();

client.on('error',(error)=>{
    console.log(`Something went wrong while creating the user and the error
        is ${error}`)
})


const wss = new WebSocketServer({server:httpserver})

let rooms = {}


app.use(express.json())


wss.on('connection' , (ws)=>{
   ws.on('message' , (userValue)=>{
    console.log('Connected to the server')
    let message = JSON.parse(userValue);
    let myMessage = message.msg;
    let roomid = message.roomid;
    let myUser = message.user;

    // Join Room
     
    if(myMessage === "JOIN"){
        if(!rooms[roomid]) rooms[roomid] = []
        rooms[roomid].push(myUser)
    }

   })

   ws.send("Someone send the message")
})

app.get("/",(req,res)=>{
    return res.json({msg:"Welcome to the red chat"})
})

app.post("/getinqueue" , async(req,res)=>{
   let {userId} = req.body
   // Now we are going to add the data in the redis and creating a queue
   try{
        let addedUser = await client.SADD("userid",userId)
        if(!addedUser) res.json({msg:"Added the userId to the queue"})
        
        let allUsers = await client.sMembers("userid")
        if(allUsers.length==2){
            const user1 = allUsers[0];
            const user2 = allUsers[1];

            // Now remove them from the set
            await client.SREM("userid", user1, user2);

            // Yep now generate a random string for both
            const matchId = randomstring.generate(10);

            // Returning the users
            return res.json({
                msg: "Users matched!",
                users: [user1, user2],
                matchId: matchId
            });
        }
   }
   catch(error){
    console.log(`Something went wrong while adding the users to the queue`+ error)
   }
})

app.get("/getqueueValues" , async(req,res)=>{
   // Now we are going to get all the userId of the queues
   try{
        let addedUser = await client.SMEMBERS("userid")
        return res.json({users:addedUser})
   }
   catch(error){
    console.log(`Something went wrong while adding the users to the queue`+ error)
   }
})





const serverCreation = async()=>{
    try{
       await client.connect()
       console.log("Successfully connected to the redis")
       console.log(`Server is running on the PORT number ${PORT}`)
    }
    catch(error){
        console.log("Something went wrong while creating the user " + error)
    }
}


serverCreation()