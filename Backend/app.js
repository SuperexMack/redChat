
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
    console.log(`Something went wrong while creating the user and the error is : ${error}`)
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
     
    if(myMessage === "JOIN"){
        if(!rooms[roomid]) rooms[roomid] = []
        rooms[roomid].push(myUser)
    }

    else if(myMessage === "SENDMESSAGE"){
        
    }

   })

   ws.send("Someone send the message")
})

app.get("/",(req,res)=>{
    return res.json({msg:"Welcome to the red chat"})
})

app.post("/getinqueue" , async(req,res)=>{
   let {userId} = req.body

   try{
      let setKey = "set_key";
      let lKey = "list_key";

      let setInsertion = await client.sMembers(setKey,userId)
      
      if(setInsertion) return res.json({msg:"You are already inside the channel"})

      else{
        await client.sAdd(setKey,userId)
        await client.rPush(lKey,userId)
      }

      let length_of_list = await client.lLen(lKey)

      if(length_of_list>=2){
        let first_user = await client.lPop(lKey)
        let second_user = await client.lPop(lKey)
        await client.sRem(setKey,first_user)
        await client.sRem(setKey,second_user)
      }

   }

   catch(error){
    console.log(`Something went wrong while adding the users to the queue`+ error)
   }
})

app.get("/getqueueValues" , async(req,res)=>{
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