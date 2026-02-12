"use client"
import { useEffect, useRef, useState } from "react";
import { SpecialText } from "../Components/TextSpecial";
import { MessageCircleWarning , MessageCircle , Shield, Users, Lock  } from 'lucide-react';
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';

interface userIdInterface{
  userId : string
}

export default function() {

  const [checkValue,setCheckValue] = useState(false)
  const [userId,setUserId] = useState("")

  const router = useRouter()

  const socket = useRef<WebSocket|null>(null)

  useEffect(()=>{
   const token = localStorage.getItem("Authorization")
   if(token){
    let getTokenValue = jwtDecode<userIdInterface>(token)
    setUserId(getTokenValue.userId)
   }
  },[])


  useEffect(()=>{
    if(!userId) return

    let filterToken = localStorage.getItem("Authorization")

    let token = filterToken?.split(" ")[1]
    
    socket.current = new WebSocket(`wss://redchatwebsockets.onrender.com?token=${token}`)

    socket.current.onopen = ()=>{
      toast.success("Connection is established")
    }

    socket.current.onmessage = ((onmessage)=>{
      let value = JSON.parse(onmessage.data)
      let roomIdd = value.payload.roomId
      router.push(`/chatting/${roomIdd}`)
    })

  },[userId])

  const donecheck = ()=>{
    setCheckValue(!checkValue)
    console.log(checkValue)
  }

  const joinRoom = ()=>{
    if(checkValue == false){
      toast.error("Check all the term and condition first")
      return
    }
    if(socket.current){
      socket.current.send(JSON.stringify({userId:userId,msg:"JOIN_ROOM"}))
      toast.success("Request to join the room is send")
    }
    else{
      toast.error("Unable to send the request please Login, in case u already did that so wait some moment")
    }
  }


  
  
  return (
    <>
      <div className="w-full h-auto p-2 flex justify-center items-center">
       
       <div className="w-[50%] rounded-3xl h-auto shadow-2xl mt-[40px] flex flex-col items-center space-y-5">

        <div className="w-full h-[200px] p-2 rounded-t-3xl bg-purple-600 flex items-center justify-center">
        <SpecialText text="Talk to Strangers"></SpecialText>
        </div>

        <div className="w-full flex items-center justify-around mt-3">

          <div className="flex flex-col space-y-2">
            <Shield className="h-[40px] w-[40px] text-red-500"></Shield>
            <h1 className="font-bold">Safe & Secure</h1>
          </div>

          <div className="flex flex-col space-y-2">
          <Users className="h-[40px] w-[40px] text-red-500"></Users>
          <h1 className="font-bold">Meet Strangers</h1>
          </div>

          <div className="flex flex-col space-y-2">
          <Lock className="h-[40px] w-[40px] text-red-500"></Lock>
          <h1 className="font-bold">Stay Anonymous</h1>
          </div>
          

        </div>

        <hr></hr>

        <div className="w-full h-auto p-2 text-center">

        <p className="text-[30px] font-bold mt-5"> Welcome to Redchat !</p>

        <p className="text-center main-landing-text border border-slate-200 p-3 text-[23px] font-medium rounded-2xl mt-[20px]">
          Welcome! to Redchat so this is the platform where
          you can talk to the strangers without knowing 
          their real identity and infact you don't need
          to worry about your own identity.
        </p>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 flex gap-4 mt-[20px]">
            <MessageCircleWarning className="w-12 h-12 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Important Safety Notice</h3>
              <p className="text-gray-700 text-[20px]">
                Never share personal information such as your full name, address, phone number, 
                or financial details with strangers. RedChat is not responsible for any incidents 
                resulting from sharing personal information.
              </p>
            </div>
          </div>

        <div className="w-full flex space-x-4 items-center mt-[20px] justify-center">
          <input className="h-[50px] w-[50px]" onClick={donecheck} type="checkbox"></input>
          <p className="text-[20px] text-red-600">
            I understand and accept the terms and conditions. 
            I will not share personal information and acknowledge 
            that RedChat is not liable for any misuse of the platform.
          </p>
        </div>



        </div>


        <div className="w-full h-auto p-3 flex items-center justify-center">

        <div onClick={joinRoom} className="space-x-3 border-2 border-black w-[70%] flex items-center p-3 justify-center bg-gray-700">

          <button className="font-bold text-[20px] rounded-2xl text-white">Start chat!!</button>
          <MessageCircle className="text-red-500"></MessageCircle>

        </div>
         

        </div>


       </div>

      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}
