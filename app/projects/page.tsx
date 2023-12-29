"use client"
import { Content } from "@/components/Content";
import { HeadedContainer } from "@/components/HeadedContainer";
import Link from "next/link";
import React from "react";

interface ProjectProps {
    src?: string,
    title: string,
    description: string,
    id: string
}

const Project: React.FunctionComponent<ProjectProps> = props => {
    // background style - either a style object or background color
    let style = {};
    let cn = "";
    if (props.src) {
        style = { backgroundImage: `url('/IBM.svg')` };
    }
    else {
        cn = "bg-gray-800/50";
    }

    // whether or not the description should be visible
    const [visible, setVisible] = React.useState(false);

    // actual content
    return <Link className={"flex flex-col min-h-[15vh] min-w-max rounded-xl bg-[50%] bg-cover overflow-hidden mx-4 mt-4 " + cn}
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

export default function Projects() {
    return <Content>
        <HeadedContainer title="Projects">
            <p>Here you can learn more about the projects I've done</p>

            <div className="flex flex-wrap justify-around items-center">
                <Project title="Yes" description="Wooh yeah wooh yeah" id="yes" />
                <Project title="Yes" description="Wooh yeah wooh yeah" id="yes" src="/IBM.svg" />
                <Project title="Yes" description="Wooh yeah wooh yeah" id="yes" />
            </div>
        </HeadedContainer>
    </Content>
}