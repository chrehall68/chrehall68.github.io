// src/components/Timeline.js
import React from "react";

export interface TimelineEntry {
    title: string,
    description: string,
    src: string,
    date: string,
    bullets?: string[]
}

interface _TE extends TimelineEntry {
    idx: number
}

const TE: React.FunctionComponent<_TE> = props => {
    // even/odd styling
    const oddStyle = "transform translateX(100%) ";
    const evenStyle = "transform translateX(-100%) ";
    const originalStyle = "bg-gray-500/30 rounded-xl p-2 mx-2 text-left ";

    const [transformStyle, setTransformStyle] = React.useState("");
    const [slideInStyle, setSlideInStyle] = React.useState("");
    const [style, setStyle] = React.useState(originalStyle)
    const elementRef = React.useRef<HTMLDivElement>(null);

    // content to display; kept like this for easy reusing
    let content = <div className={style}>
        <p className="text-lg md:text-xl">{props.title}</p>
        <p className="italic">{props.date}</p>
        <p className="py-2">{props.description}</p>
        {props.bullets?.map((val, index) => <li key={index}>{val}</li>)}
    </div>

    // monitor scroll events so that we can slide element in once it appears on screen
    // and  monitor resize events so we can see which slideInAnimation to use
    React.useEffect(
        () => {
            const f = () => {
                const rect = elementRef?.current?.getBoundingClientRect();
                if (rect !== null) {
                    if (0 < (rect?.top || 0) && (rect?.top || 0) < window.innerHeight && !style.includes(slideInStyle)) {
                        setStyle(originalStyle + transformStyle + slideInStyle);
                    }
                }
            }
            const g = () => {
                const size = window.innerWidth;
                const val = props.idx % 2 == 0 ? "animate-slideInRight " : "animate-slideInLeft ";
                if (size >= 1024) {  // large screen
                    if (slideInStyle != val) {
                        setSlideInStyle(val);
                        setTransformStyle(props.idx % 2 == 0 ? evenStyle : oddStyle);
                    }
                }
                // if less than large screen
                // use the mobile layout (which only needs the slide-in-from-the-left animation)
                else if (slideInStyle != "aimate-slideInLeft ") {
                    setSlideInStyle("animate-slideInLeft ");
                    setTransformStyle(oddStyle);
                }
            }

            // call first time
            g();
            f();

            // set event listeners
            window.addEventListener("resize", g)
            window.addEventListener("scroll", f)

            // cleanup function
            return () => { window.removeEventListener("scroll", g); window.removeEventListener("scroll", f); };
        }
    )

    // rendered html
    return <div className="relative w-full pb-4" ref={elementRef}>
        {/** Desktop View */}
        <div className="hidden lg:flex flex-inline w-full">
            <div className="absolute top-0 bottom-0 left-[50%] z-1 bg-black dark:bg-white w-[2px]" />
            <div className="w-[45%]">{props.idx % 2 == 0 ? content : null}</div>
            <div className="w-[10%] flex items-center justify-center z-0"><img src={props.src} className="w-full lg:w-16 bg-white dark:bg-black border border-black dark:border-white" alt="image" /></div>
            <div className="w-[45%]">{props.idx % 2 == 0 ? null : content}</div>
        </div>
        {/** Mobile View */}
        <div className="flex flex-inline w-full lg:hidden">
            <div className="absolute top-0 bottom-0 left-[5%] z-1 bg-black dark:bg-white w-[2px]" />
            <div className="w-[10%] flex items-center justify-center z-0"><img src={props.src} className="w-full lg:w-16 bg-white dark:bg-black border border-black dark:border-white" alt="image" /></div>
            <div className="w-[90%]">{content}</div>
        </div>
    </div>
}

export interface TimelineProps {
    entries: TimelineEntry[]
}

export const Timeline: React.FunctionComponent<TimelineProps> = props => {

    return (
        <div className="flex flex-col mt-2 overflow-x-hidden">
            {props.entries.map((entry, index) =>
                <TE key={index} idx={index} src={entry.src} title={entry.title}
                    description={entry.description} date={entry.date} bullets={entry.bullets} />
            )}
        </div>
    );
};
