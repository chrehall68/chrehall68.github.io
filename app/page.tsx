'use client'
import { useEffect, useState } from "react";

function Underlined(prefix: string, items: string[], letters_per_min: number = 500, ms_to_wait: number = 800, blink_time: number = 400, blink: boolean = true) {
  const [item, setitem] = useState(0);
  const [idx, setIdx] = useState(0);
  const [increasing, setIncreasing] = useState(true);
  const [waitTime, setWaitTime] = useState(0);
  const [opaque, setOpaque] = useState(true);
  const interval = 60 * 1000 / letters_per_min

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
      else if (waitTime < ms_to_wait) {
        setWaitTime(waitTime + interval);

        // blink the cursor
        if (blink) {
          if (waitTime % (blink_time * 2) < blink_time) {
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
    }, interval)

    return () => clearInterval(tick)
  }, [item, idx, increasing, waitTime, opaque])

  return <div className="flex flex-inline"><p>{prefix} <u>{items[item].substring(0, idx)}</u></p><span className={opaque ? "border border-white" : ""}></span></div>
}

export default function Home() {
  return <main>
    {Underlined("I make ", ["embedded firmware", "applications", "CLI scripts", "tomorrow's software"], 500, 1000)}
  </main>
}