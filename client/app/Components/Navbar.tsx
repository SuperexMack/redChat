"use client"

import Link from "next/link";
import { Github } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { DoorOpen } from 'lucide-react';
import { jwtDecode } from "jwt-decode"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';

interface useridinfo{
  userId:string
}


export function Navbar(){

  const [userlogin,setUserlogin] = useState(false)

  const router = useRouter()

  useEffect(()=>{
   let findToken = localStorage.getItem("Authorization")
   if(findToken && findToken !== "Bearer undefined"){
     setUserlogin(true)
   }
  },[])

  const LogoutUser = ()=>{
    if(userlogin){
      localStorage.removeItem("Authorizaton")
      toast.success("User is logged out wait a moment.....")
      setTimeout(()=>router.push("/join"),2000)
    }
  }


    return(
        <>
        <div className="h-[80px] flex items-center w-full bg-black sticky top-0 z-50">
          
          <div className="absolute left-[10%]">
            <p className="navText text-[40px] font-bold text-white">RedChat</p>
          </div>

          <div className="absolute right-[10%] flex space-x-16">
           <Link className="text-[20px] text-white font-bold" href={"https://github.com/SuperexMack/redChat"}><Github></Github><span>Github</span></Link>
           {userlogin?(

            <>
              <button onClick={LogoutUser} className="text-[20px] text-white font-bold"><LogOut></LogOut><span>LogOut</span></button>
            </>

           ):(
            <>
             <Link className="text-[20px] text-white font-bold" href={"/"}><LogIn></LogIn><span>Join</span></Link>
            </>
           )}
          </div>

        </div>
        <ToastContainer></ToastContainer>
        </>
    )
}