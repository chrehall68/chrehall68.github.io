"use client";
import { IProject } from '@/interfaces/IProject';
import Link from 'next/link'
import React from 'react';


export const Project: React.FunctionComponent<IProject> = props => {
    // background style - either a style object or background color
    let style = {};
    if (props.imageSrc) {
        style = { backgroundImage: `url('${props.imageSrc}')` };
    }

    // whether or not the description should be visible
    const [visible, setVisible] = React.useState(false);

    // actual content
    return <Link className={"h-[20vh] w-[25vh] lg:h-[15vw] lg:w-[20vw] rounded-xl bg-[50%] bg-cover overflow-hidden mx-4 mt-4 "}
        style={style}
        href={`/projects/${props.id}`}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onTouchStart={() => setVisible(true)}
        onTouchEnd={() => setVisible(false)}

    >
        <div className="flex flex-col w-full h-full bg-gray-300/50 dark:bg-gray-800/50 ">
            <p className="text-xl pb-2 px-2 pt-2">{props.title}</p>
            <p className={"grow px-2 bg-gray-300/50 dark:bg-gray-800/50 "
                + (visible ? "animate-slideInFromBottom" : "invisible")}>{props.description}</p>
        </div>
    </Link>
}