"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import first from "../../photofoll/firstt.jpg"
import second from "../../photofoll/secondd.jpeg"
import third from "../../photofoll/thirdd.jpg"
import fourth from "../../photofoll/fourthh.jpg"
import fifth from "../../photofoll/fifthh.jpeg"
import sixth from "../../photofoll/sixxth.webp"
import seventh from "../../photofoll/seventhh.jpeg"
import eigth from "../../photofoll/eigth.jpeg"
import ninth from "../../photofoll/ninthh.jpg"
import { useRouter } from "next/navigation";

export function ThreeDMarqueeDemoSecond() {
  const images = [
    first.src,
    second.src,
    third.src,
    fourth.src,
    fifth.src,
    sixth.src,
    seventh.src,
    eigth.src,
    ninth.src,
    first.src,
    second.src,
    third.src,
    fourth.src,
    fifth.src,
    sixth.src,
    seventh.src,
    eigth.src,
    ninth.src,
    first.src,
    second.src,
    third.src,
    fourth.src,
    fifth.src,
    sixth.src,
    seventh.src,
    eigth.src,
    ninth.src,
    first.src,
    second.src,
    third.src,
    fourth.src,
    fifth.src,
    sixth.src,
    seventh.src,
    eigth.src,
    ninth.src,
  ];

  const route = useRouter()

  const sendtoroom = ()=>{
    route.push("/roomsection")
  }



  return (
    <div className="relative mx-auto my-10 bg-black flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-3xl">
      <h2 className="relative main-landing-text z-20 mx-auto md:w-[50%] text-center text-[40px]  md:text-[60px] font-bold text-balance text-white">
        Feeling <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-4 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">Boredom</span>
        Today ?
      </h2>
      <p className="relative font-bold z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
        So Join RedChat , So basically this platform help you to talk with 
        anonymous people. and here you are anonymous too so now you don't
        need think about what the next person will say just share your thoughts
        and all this for 2 minutes.
      </p>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
        <button onClick={sendtoroom} className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
          Join the club
        </button>
        <button className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
          Read more
        </button>
      </div>

      
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
