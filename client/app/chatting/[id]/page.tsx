"use client"

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { jwtDecode } from "jwt-decode";

interface userIdInterface{
  userId : string
}


export default function(){


  const [message,setMessage] = useState("")
  const [userId,setUserId] = useState("")
  const [allmessages,setAllMessages] =  useState<string[][]>([]);

  const socket = useRef<WebSocket|null>(null)

  const {id} = useParams()


  // User Validating Stuff

  useEffect(()=>{
    
  },[])


  useEffect(()=>{
     const token = localStorage.getItem("Authorization")
     if(token){
      let getTokenValue = jwtDecode<userIdInterface>(token)
      setUserId(getTokenValue.userId)
     }
    },[])
  

  useEffect(()=>{

    if (!userId) return;

    let filterToken = localStorage.getItem("Authorization")

    let token = filterToken?.split(" ")[1]

    socket.current = new WebSocket(`ws://localhost:9000?token=${token}`)
    
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



   const sendMessage = ()=>{
     if(socket.current){
      socket.current.send(JSON.stringify({msg:"SENDMESSAGE",roomId:id,userId:userId,textbyuser:message}))
      setMessage("")
     }
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
          <input value={message} onChange={(e)=>setMessage(e.target.value)} className="w-full border-2 border-black p-2 mt-3" placeholder="Hello Bruh how are you??"></input>
          <button onClick={sendMessage} className="bg-purple-700 p-2 mt-2 rounded-lg text-[20px] text-white">Send Message.....</button>
        </div>

    </div>
    </>
   )
}