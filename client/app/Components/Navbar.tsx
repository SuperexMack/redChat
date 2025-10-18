import Link from "next/link";
import { Github } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { DoorOpen } from 'lucide-react';

export function Navbar(){
    return(
        <>
        <div className="h-[80px] flex items-center w-full backdrop-blur-lg bg-white/5 sticky top-0 z-50">
          
          <div className="absolute left-[10%]">
            <p className="navText text-[40px] font-bold text-white">RedChat</p>
          </div>

          <div className="absolute right-[10%] flex space-x-16">
           <Link className="text-[20px] text-white font-bold" href={"/"}><Github></Github><span>Github</span></Link>
           <Link className="text-[20px] text-white font-bold" href={"/"}><LogIn></LogIn><span>Login</span></Link>
           <Link className="text-[20px] text-white font-bold" href={"/"}><DoorOpen></DoorOpen><span>Signin</span></Link>
          </div>

        </div>
        </>
    )
}