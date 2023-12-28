// src/components/Timeline.js
import React from 'react';

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
    let oddStyle = "text-left transform translateX(100%)";
    let evenStyle = "text-left transform translateX(-100%)";
    let extraStyle = props.idx % 2 == 0 ? evenStyle : oddStyle;
    let originalStyle = "bg-gray-500/30 rounded-xl p-2 mx-2 " + extraStyle;

    let slideInStyle = props.idx % 2 == 0 ? " animate-slideInRight" : " animate-slideInLeft";

    const [style, setStyle] = React.useState(originalStyle)
    const elementRef = React.useRef<HTMLDivElement>(null);

    let content = <div className={style}>
        <p className='text-lg md:text-xl'>{props.title}</p>
        <p className='italic'>{props.date}</p>
        <p className='py-2'>{props.description}</p>
        {props.bullets?.map((val, index) => <li key={index}>{val}</li>)}
    </div>

    React.useEffect(
        () => {
            const f = () => {
                const rect = elementRef?.current?.getBoundingClientRect();
                if (rect !== null) {
                    if (0 < (rect?.top || 0) && (rect?.top || 0) < window.innerHeight && !style.includes(slideInStyle)) {
                        setStyle(originalStyle + slideInStyle);
                    }
                }
            }

            f();
            window.addEventListener("scroll", f)

            return () => window.removeEventListener("scroll", f);
        }, []
    )

    return <div className='relative w-full pb-4 flex flex-inline' ref={elementRef}>
        <div className='absolute top-0 bottom-0 left-[50%] z-1 bg-black dark:bg-white w-[2px]' />
        <div className='w-[45%]'>{props.idx % 2 == 0 ? content : null}</div>
        <div className='w-[10%] flex items-center justify-center z-0'><img src={props.src} className='w-full lg:w-16 bg-white dark:bg-black border border-black dark:border-white' alt="image" /></div>
        <div className='w-[45%]'>{props.idx % 2 == 0 ? null : content}</div>
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
