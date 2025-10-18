
// So This is a open source backend code that's why i am writing comment here
// Let's Gooooooooooooooooo..............

import express from "express"
import dotenv from "dotenv"
import { createClient } from "redis"
const app = express()
dotenv.config()

const PORT = process.env.PORT

const client  = createClient();

client.on('error',(error)=>{
    console.log(`Something went wrong while creating the user and the error
        is ${error}`)
})


app.use(express.json())

app.get("/",(req,res)=>{
    return res.json({msg:"Welcome to the red chat"})
})

app.post("/getinqueue" , async(req,res)=>{
   let {userId} = req.body
   // Now we are going to add the data in the redis and creating a queue
   try{
        let addedUser = await client.SADD("userid",userId)
        if(addedUser) res.json({msg:"Added the userId to the queue"})
        else res.json({msg:"User already exist in the queue"})
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
       app.listen(PORT , ()=>{
            console.log(`Server is running on the PORT number ${PORT}`)
       })
    }
    catch(error){
        console.log("Something went wrong while creating the user " + error)
    }
}


serverCreation()