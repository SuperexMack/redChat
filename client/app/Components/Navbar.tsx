"use client"
import Link from  "next/link"
import { Github , List, LogIn, LogOut} from 'lucide-react';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
export default function Navbar({feature,works,pricing}:any){

   

  const [userlogin,setUserlogin] = useState(false)
  const [clicked,setClicked] = useState(false)
  const [touched,setTouched] = useState(false)

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



   const toogle = ()=>{
      setTouched(!touched)
   }


   return(
     <>
     <div className="w-full z-50 fixed top-0 h-[80px] bg-black  flex items-center justify-center">
        <div className="absolute left-[10%] flex items-center justify-center space-x-2">
            <Link href={"/"}><h1 className="md:text-[30px] sm:text-[25px] text-[20px] text-white navText font-bold" >RedChat</h1></Link>
	      </div>

	<div className="flex  max-[1000px]:hidden justify-center items-center space-x-5">
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

	</div>

   <div className="absolute min-[1000px]:hidden right-[10%]">
       <List onClick={toogle} className="text-white h-[30px] w-[30px]"></List>
   </div>

     </div>

     {touched?(
       <>
      <div className=" fixed top-[80px] h-auto w-full bg-black flex flex-col items-center space-y-4 py-6 z-40 shadow-lg">
          
          <div className="flex flex-col items-center space-y-4">

           <Link className="text-[20px] md:flex text-white font-bold" href={"https://github.com/SuperexMack/redChat"}><Github></Github></Link>
           <h1 className="text-white text-[20px] font-bold">Github</h1>
          
          </div>

           {userlogin?(

            <>
              <button onClick={LogoutUser} className="text-[20px] md:flex text-white font-bold"><LogOut></LogOut><span>LogOut</span></button>
            </>

           ):(
            <>
             <Link className="text-[20px] md:flex text-white font-bold" href={"/join"}><LogIn></LogIn><span>Join</span></Link>
            </>
           )}

      </div>
       </>
     ):(
      <>
      </>
     )}

   <ToastContainer></ToastContainer>
     </>
   )
}