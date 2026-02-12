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
import { Menu } from 'lucide-react';

interface useridinfo{
  userId:string
}


export function Navbar(){

  const [userlogin,setUserlogin] = useState(false)
  const [clicked,setClicked] = useState(false)

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

  const clickedBurger = ()=>{
    setClicked(!clicked)
  }


    return(
        <>
        <div className="h-[80px] overflow-hidden flex items-center w-full bg-black sticky top-0 z-30">
          
          <div className="absolute left-[5%] sm:left-[8%] md:left-[10%]">
            <p className="navText text-[25px] sm:text-[30px] md:text-[30px] font-bold text-white">RedChat</p>
          </div>

          <div className="absolute right-[10%] flex space-x-16">
           <Link className="text-[20px] hidden md:flex text-white font-bold" href={"https://github.com/SuperexMack/redChat"}><Github></Github><span>Github</span></Link>
          
           {userlogin?(

            <>
              <button onClick={LogoutUser} className="text-[20px] hidden md:flex text-white font-bold"><LogOut></LogOut><span>LogOut</span></button>
            </>

           ):(
            <>
             <Link className="text-[20px] hidden md:flex text-white font-bold" href={"/join"}><LogIn></LogIn><span>Join</span></Link>
            </>
           )}

            <Menu onClick={clickedBurger} className="text-white mt-2 md:hidden"></Menu>

            

          </div>

          

        </div>
        {clicked ? (

              <div className="flex flex-col items-center space-y-4 h-auto p-2 bg-red-500 w-full mt-[100px z-40">
                <Link className="text-[20px]  text-white font-bold" href={"https://github.com/SuperexMack/redChat"}><Github></Github><span>Github</span></Link>
          
                {userlogin?(

                    <>
                        <button onClick={LogoutUser} className="text-[20px]  text-white font-bold"><LogOut></LogOut><span>LogOut</span></button>
                     </>

                    ):(
                    <>
                      <Link className="text-[20px]  text-white font-bold" href={"/join"}><LogIn></LogIn><span>Join</span></Link>
                    </>
                )}
              </div>

            ):(
              <>
              </>
            )}
        <ToastContainer></ToastContainer>
        </>
    )
}