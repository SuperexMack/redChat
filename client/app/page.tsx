import Image from "next/image";
import { Landing } from "./Components/LandingPage";

export default function Home() {
  return(
    <>
    <div className="flex flex-col w-full min-h-screen bg-[#080808]">

      <Landing></Landing>

    </div>
    </>
  )
}
