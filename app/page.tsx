'use client'
import { NavBar } from "@/components/NavBar";
import { useEffect, useState } from "react";

function UnderlinedTypeAnimation(prefix: string, items: string[], lettersPerMin: number = 500, waitMS: number = 1100, blinkMS: number = 530, blink: boolean = true) {
  const [item, setitem] = useState(0);
  const [idx, setIdx] = useState(0);
  const [increasing, setIncreasing] = useState(true);
  const [waitTime, setWaitTime] = useState(0);
  const [opaque, setOpaque] = useState(true);
  const interval = 60 * 1000 / lettersPerMin;

  useEffect(() => {
    let tick = setInterval(() => {
      if (increasing) {
        // reset wait timer
        if (waitTime != 0) {
          setWaitTime(0);
        }

        // increase idx
        setIdx(idx + 1);
        if (idx === items[item].length) {
          setIncreasing(false);
        }
      }
      else if (waitTime < waitMS) {
        setWaitTime(waitTime + blinkMS);

        // blink the cursor
        if (blink) {
          if (waitTime % (blinkMS * 2) < blinkMS) {
            // have the cursor on
            if (!opaque) {
              setOpaque(true);
            }
          }
          else {
            if (opaque) {
              setOpaque(false);
            }
          }
        }
      }
      else {
        // go back to typing with the full cursor
        if (blink) {
          if (!opaque) {
            setOpaque(true);
          }
        }

        // decrease idx
        setIdx(idx - 1);
        if (idx === 0) {
          setitem((item + 1) % items.length);
          setIncreasing(true);
        }
      }
    }, (!increasing && waitTime < waitMS) ? blinkMS : interval);

    return () => clearInterval(tick)
  }, [item, idx, increasing, waitTime, opaque, interval, items, waitMS, blinkMS, blink])

  return <div className="flex overflow-hidden bg-cover bg-[50%] bg-no-repeat h-[50%] w-full"
    style={{ backgroundImage: "url('/codebg.png')" }}>
    <div className="flex h-full w-full bg-black overflow-hidden bg-fixed place-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.6" }}>
      <div className="w-full h-min flex flex-wrap justify-center">
        <div className="flex flex-inline justify-center w-full lg:w-max">
          <p className="text-3xl lg:text-5xl">{prefix}</p>
        </div>
        <div className="flex flex-inline justify-center w-full lg:w-min">
          <p className="text-3xl lg:text-5xl">&nbsp;<u>{items[item].substring(0, idx).replace(" ", '\xa0')}</u></p>
          <span className={opaque ? "border border-white" : ""}></span>
        </div>
      </div>
    </div>
  </div>
}

export default function Home() {
  return <main className="h-screen overflow-y-scroll overflow-x-hidden">
    {NavBar()}
    {UnderlinedTypeAnimation("I make ", ["embedded firmware", "applications", "CLI scripts", "artificial intelligence", "tomorrow's software"])}
  </main>
}