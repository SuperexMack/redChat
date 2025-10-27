import Shuffle from "../../components/Shuffle";

interface mytext{
    text : string
}

export function SpecialText({text}:mytext) {
  return (
    <>
      <Shuffle
        className="font-bold text-white mt-2"
        text={text}
        shuffleDirection="right"
        duration={0.35}
        animationMode="evenodd"
        shuffleTimes={1}
        ease="power3.out"
        stagger={0.03}
        threshold={0.1}
        triggerOnce={true}
        triggerOnHover={true}
        respectReducedMotion={true}
      />
    </>
  );
}
