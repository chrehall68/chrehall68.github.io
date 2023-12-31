import Link from 'next/link'
import React from 'react';

export interface ProjectProps {
    src?: string,
    title: string,
    description: string,
    id: string
}

export const Project: React.FunctionComponent<ProjectProps> = props => {
    // background style - either a style object or background color
    let style = {};
    let cn = "";
    if (props.src) {
        style = { backgroundImage: `url('${props.src}')` };
    }
    else {
        cn = "bg-gray-800/50";
    }

    // whether or not the description should be visible
    const [visible, setVisible] = React.useState(false);

    // actual content
    return <Link className={"flex flex-col h-[20vh] w-[25vh] lg:h-[15vw] lg:w-[20vw] rounded-xl bg-[50%] bg-cover overflow-hidden mx-4 mt-4 " + cn}
        style={style}
        href={`/projects/${props.id}`}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onTouchStart={() => setVisible(true)}
        onTouchEnd={() => setVisible(false)}

    >
        <p className="text-xl pb-2 px-2 pt-2">{props.title}</p>
        <p className={"grow px-2 " + (cn != "" ? "" : "bg-gray-300/80 dark:bg-gray-800/50 ")
            + (visible ? "animate-slideInFromBottom" : "invisible")}>{props.description}</p>
    </Link>
}