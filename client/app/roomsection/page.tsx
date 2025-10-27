"use client"
import { useState } from "react";
import { SpecialText } from "../Components/TextSpecial";
import { MessageCircleWarning , MessageCircle } from 'lucide-react';

export default function() {

  const [checkValue,setCheckValue] = useState(false)

  const donecheck = ()=>{
    setCheckValue(!checkValue)
    console.log(checkValue)
  }

  const joinRoom = ()=>{
    if(checkValue == false) alert("Check all the term and condition first")
  }
  
  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-r from-purple-800 via-purple-900 to-pink-500  flex justify-center items-center">
       
       <div className="w-[50%] h-auto p-2  flex flex-col items-center space-y-5">

        <SpecialText text="Talk to Strangers"></SpecialText>

        <div className="w-full h-auto p-2">

        <p className="text-center text-[25px] bg-purple-700 rounded-2xl font-mono text-white">
          Welcome! to Redchat so this is the platform where
          you can talk to the strangers without knowing 
          their real identity and infact you don't need
          to worry about your own identity.
        </p>

        <div className="flex w-full h-auto p-1 space-x-3 mt-6 items-center justify-center ">

         <MessageCircleWarning className="h-[30px] text-yellow-500 w-[30px]"></MessageCircleWarning>
         <p className="text-center">
          Don't share your personal information
          to any of the stranger and incase you
          get trapped in these type of case then 
          Redchat will not be responsible for that
         </p>

        </div>

        <div className="w-full flex space-x-4 items-center mt-4 justify-center">
          <input onClick={donecheck} type="checkbox"></input>
          <p>Yes i accept all the terms and condition</p>
        </div>



        </div>

        <div className="w-full h-auto p-3 flex items-center justify-center">

        <div onClick={joinRoom} className="space-x-3 w-[70%] flex items-center p-3 justify-center bg-gray-700">

          <button className="font-bold text-[20px] rounded-2xl text-white">Start chat!!</button>
          <MessageCircle></MessageCircle>

        </div>
         

        </div>


       </div>

      </div>
    </>
  );
}
