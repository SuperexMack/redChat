import { ThreeDMarqueeDemoSecond } from "./LandingComponent";
import { Navbar } from "./Navbar";

export function Landing(){
    return(
        <>
        <div className="w-full min-h-screen">

           <Navbar></Navbar>

           <ThreeDMarqueeDemoSecond></ThreeDMarqueeDemoSecond>

        </div>
        </>
    )
}