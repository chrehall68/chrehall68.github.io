// src/components/Timeline.js
import React from 'react';

export interface TimelineEntry {
    title: string,
    description: string,
    src: string,
    date: string,
}

interface _TE extends TimelineEntry {
    idx: number
}

const TE: React.FunctionComponent<_TE> = props => {
    let evenStyle = "animate-slideInLeft text-right";
    let oddStyle = "animate-slideInRight text-left";

    let content = <div className={"bg-gray-500/30 rounded-xl p-2 mx-2 " + (props.idx % 2 == 0 ? oddStyle : evenStyle)}>
        <p className='text-xl'>{props.title}</p>
        <p className='italic'>{props.date}</p>
        <p>{props.description}</p>
    </div>

    return <div className='relative w-full pb-4 flex flex-inline'>
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
        <div className="flex flex-col">
            {props.entries.map((entry, index) =>
                <TE key={index} idx={index} src={entry.src} title={entry.title}
                    description={entry.description} date={entry.date} />
            )}
        </div>
    );
};
