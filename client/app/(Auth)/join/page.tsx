"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";

export default function () {

  const [loading,setLoading] = useState(false)

  const router = useRouter()

  const Signup = async(credentialResponse:any) => {
    try {
      setLoading(true)
      const idToken = credentialResponse.credential;

      await axios.post("https://redchatwebsockets.onrender.com/v1/googleAuth/googleauth/user", {
        idToken,
      })
      .then((response)=>{
        setLoading(false)
        toast.success(response.data.msg)
        setTimeout(()=>router.push("/"),2000)
        localStorage.setItem("Authorization" , "Bearer " + response.data.token)
      })
      .catch((error)=>{
        setLoading(false)
        toast.error("Something went wrong while joining " + error)
        console.log("Something went wrong while setting a login " + error)
      })


    } 
    catch (err) {
      toast.error("Something went wrong while joining RedChat by google")
      console.error("Login failed:" + err);
    }

  };

  return (

    <>

    {loading?(

      <>
      <div className="h-screen w-full flex flex-col space-y-4 items-center justify-center">
        
          <div className="h-[60px] w-[60px] border-4 rounded-full animate-spin border-purple-800 border-t-white"></div>

          <h1 className="text-[20px]">Loading.....</h1>

      </div>
      </>

    ):(
      <>
       <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[300px] rounded-3xl border-2 border-slate-200 h-auto flex flex-col items-center p-3 backdrop-blur-lg shadow-2xl bg-white/5">
          <h1 className="font-bold text-[20px]">Join to click!!</h1>

          <div className="w-full h-auto flex items-center justify-center mt-[50px]">
            <GoogleLogin
              onSuccess={Signup}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>

          <h1 className="text-center mt-[40px] font-medium">Join Via Google Auth</h1>

        </div>
      </div>
      <ToastContainer></ToastContainer>
      </>
    )}
    </>
  );
}
