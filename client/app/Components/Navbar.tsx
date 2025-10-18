import Link from "next/link";

export function Navbar(){
    return(
        <>
        <div className="h-[80px] flex items-center w-full backdrop-blur-lg bg-white/5 sticky top-0 z-50">
          
          <div className="absolute left-[10%]">
            <p className="navText text-[40px] font-bold text-white">RedChat</p>
          </div>

          <div className="absolute right-[10%] flex space-x-5">
           <Link className="text-[20px] text-white font-bold" href={"/"}>Github</Link>
           <Link className="text-[20px] text-white font-bold" href={"/"}>Login</Link>
           <Link className="text-[20px] text-white font-bold" href={"/"}>SignUp</Link>
          </div>

        </div>
        </>
    )
}