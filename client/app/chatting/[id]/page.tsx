"use client"

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"

export default function(){


  const [message,setMessage] = useState("")
  const [userId,setUserId] = useState("")
  const [allmessages,setAllMessages] =  useState<string[][]>([]);

  const socket = useRef<WebSocket|null>(null)

  const {id} = useParams()

  useEffect(()=>{

    if (!userId) return;

    socket.current = new WebSocket("ws://localhost:9000")
    
    socket.current.onopen = ()=>{
      alert("connection established")
      if(socket.current){
        socket.current.send(JSON.stringify({userId:userId,msg:"JOIN_ROOM"}))
        alert("Send the id internally")
      }
    }

    socket.current.onmessage = (onMessage)=>{
      let value = JSON.parse(onMessage.data)
      if(value.msg === "SENDMESSAGE") setAllMessages((prev)=>[...prev,[value.textbyuser,value.userId]])
      console.log("The value of message is : " + allmessages)
    }
      
  },[userId])


  //  const allMessage = [["This is rahul",1] , 
  //  ["hi Rahul this side kunal",2],
  //  ["mai changa veere" , 1],
  //  ["mai to user 2 hun",2],
  //  ["user 2 hai smart",2], ["aacha beta",1]]

   const sendMessage = ()=>{
     if(socket.current) socket.current.send(JSON.stringify({msg:"SENDMESSAGE",roomId:id,userId:userId,textbyuser:message}))
   }


   return(
    <>
    <div className="w-full h-screen bg-white flex items-center justify-center flex-col">

        <div className="w-[50%] relative bg-slate-100 rounded-3xl border-2 border-black h-[600px] flex flex-col space-y-4 p-4">
             
        <div>
            {allmessages.map((value,index)=>(
             <>
             <div className="w-full h-auto p-2 mt-3" key={index}>
                <p className={`${value[1] == userId ? "absolute left-2 font-bold":"absolute right-2 font-bold"}`}>{value[0]}</p>
             </div>
             </>
            ))}
        </div>
         
           
        </div>
        
        <div className="w-[50%] flex flex-col h-auto">
          <input onChange={(e)=>setMessage(e.target.value)} className="w-full border-2 border-black p-2 mt-3" placeholder="Hello Bruh how are you??"></input>
          <input onChange={(e)=>setUserId(e.target.value)} className="w-full border-2 border-black p-2 mt-3" placeholder="Enter userid"></input>
          <button onClick={sendMessage} className="bg-purple-700 p-2 mt-2 rounded-lg text-[20px] text-white">Send Message.....</button>
        </div>

    </div>
    </>
   )
}