import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IconProps {
    whiteSrc: string,
    darkSrc: string,
    link: string,
    alt: string,
    size: number,
}

const Icon: React.FunctionComponent<IconProps> = props => {
    return <div className="h-min">
        <Link href={props.link} className="w-max flex flex-inline items-center text-black dark:hidden py-4">
            <div className="p-2">
                <Image src={props.whiteSrc} alt={props.alt} width={props.size} height={props.size} />
            </div>
            {props.alt}
        </Link>
        <Link href={props.link} className="w-max hidden text-white dark:flex dark:flex-inline dark:items-center py-4">
            <div className="p-2">
                <Image src={props.darkSrc} alt={props.alt} width={props.size} height={props.size} />
            </div>
            {props.alt}
        </Link>
    </div>
}

export const Footer: React.FunctionComponent = () => {
    return <footer className="flex flex-wrap w-full">
        <div className="mx-[16.6%] w-full">
            <div className="border border-black dark:border-white w-full h-min" />
            <div className="flex w-full h-max justify-around">
                <Icon darkSrc="/github-mark-white.svg" whiteSrc="/github-mark.svg" alt="GitHub" size={20} link="https://github.com/chrehall68" />
                <Icon darkSrc="/linkedin-white.svg" whiteSrc="/linkedin.svg" alt="Linkedin" size={20} link="https://www.linkedin.com/in/christopher-eliot-hall" />
            </div>
        </div>
    </footer>
}