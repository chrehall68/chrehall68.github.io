"use client"
import { Content } from "@/components/Content";
import { HeadedContainer } from "@/components/HeadedContainer";
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

  return <div className="flex overflow-hidden bg-[50%] bg-cover bg-no-repeat h-[50vh] w-full text-white"
    style={{ backgroundImage: "url('/codebg.png')" }}>
    <div className="flex h-full w-full bg-black overflow-hidden bg-fixed place-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.6" }}>
      <div className="w-full h-min flex flex-wrap justify-center">
        <div className="flex flex-inline justify-center w-full lg:w-max">
          <p className="text-3xl lg:text-5xl">{prefix}</p>
        </div>
        <div className="flex flex-inline justify-center w-full lg:w-min">
          <p className="text-3xl lg:text-5xl">&nbsp;<u>{items[item].substring(0, idx).replace(" ", "\xa0")}</u></p>
          <span className={opaque ? "border border-white" : ""}></span>
        </div>
      </div>
    </div>
  </div>
}

export default function Home() {
  return <Content pre={() => UnderlinedTypeAnimation("I make ", ["embedded firmware", "applications", "CLI scripts", "artificial intelligence", "tomorrow's software"])}>
    < HeadedContainer title="Hi there" className="py-10" >
      <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus viverra accumsan in nisl nisi. Sit amet risus nullam eget. Massa massa ultricies mi quis. Vivamus at augue eget arcu dictum varius duis at consectetur. Viverra suspendisse potenti nullam ac tortor. Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Ipsum suspendisse ultrices gravida dictum fusce ut. Aliquam etiam erat velit scelerisque in dictum non consectetur a. Lacus sed turpis tincidunt id aliquet risus feugiat. Viverra tellus in hac habitasse platea.</p>
    </HeadedContainer >
    <p className="pb-10">Donec pretium vulputate sapien nec sagittis aliquam malesuada. Ornare quam viverra orci sagittis eu. Cursus in hac habitasse platea dictumst quisque. Aliquet lectus proin nibh nisl condimentum. Turpis egestas integer eget aliquet nibh praesent tristique magna sit. Vestibulum mattis ullamcorper velit sed ullamcorper. Nibh ipsum consequat nisl vel pretium lectus quam. Sit amet porttitor eget dolor morbi non arcu risus quis. Morbi tristique senectus et netus et malesuada fames ac. Tincidunt ornare massa eget egestas. Sed viverra tellus in hac habitasse platea dictumst vestibulum. Et pharetra pharetra massa massa ultricies mi quis hendrerit. Gravida arcu ac tortor dignissim convallis. Non diam phasellus vestibulum lorem.</p>
    <p className="pb-10">Malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Sed enim ut sem viverra aliquet eget. At elementum eu facilisis sed odio morbi. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Suspendisse sed nisi lacus sed viverra tellus in. Lacinia at quis risus sed vulputate odio ut. Tellus orci ac auctor augue mauris augue neque. Dui vivamus arcu felis bibendum ut tristique et egestas quis. In tellus integer feugiat scelerisque. Aliquet sagittis id consectetur purus ut faucibus. Ullamcorper a lacus vestibulum sed arcu. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Eget mi proin sed libero enim sed. Lobortis elementum nibh tellus molestie nunc non blandit. Dui id ornare arcu odio ut. Magna fringilla urna porttitor rhoncus dolor purus non enim. Est sit amet facilisis magna etiam tempor.</p>
    <p className="pb-10">Malesuada pellentesque elit eget gravida cum sociis natoque. Commodo viverra maecenas accumsan lacus vel facilisis. Lectus mauris ultrices eros in cursus turpis massa tincidunt. Bibendum arcu vitae elementum curabitur. Hendrerit dolor magna eget est lorem ipsum dolor. At consectetur lorem donec massa sapien faucibus et molestie ac. Mollis nunc sed id semper risus. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Consectetur adipiscing elit ut aliquam purus sit amet luctus. Aliquam id diam maecenas ultricies mi eget mauris pharetra et.</p>
    <p>Ut tellus elementum sagittis vitae et. Consequat id porta nibh venenatis cras sed felis eget velit. Mauris sit amet massa vitae tortor condimentum lacinia quis. Lectus proin nibh nisl condimentum id. Sit amet dictum sit amet justo donec enim diam vulputate. Et leo duis ut diam quam. Vel pharetra vel turpis nunc. Viverra suspendisse potenti nullam ac. Imperdiet sed euismod nisi porta lorem. Tincidunt lobortis feugiat vivamus at. Mi ipsum faucibus vitae aliquet. Massa sed elementum tempus egestas. Auctor elit sed vulputate mi sit.</p>
  </Content >
}