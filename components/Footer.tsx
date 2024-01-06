import React from "react";
import Link from "next/link";
import { GitHub, LinkedIn } from "./svgs";

interface FooterIconProps {
    link: string,
    iconSrc: React.ReactNode,
    alt: string
}

const FooterIcon: React.FunctionComponent<FooterIconProps> = props => {
    return <div className="h-min">
        <Link href={props.link} className="w-max flex flex-inline items-center py-4">
            <div className="p-2">
                {props.iconSrc}
            </div>
            <p>
                {props.alt}
            </p>
        </Link>
    </div>
}


export const Footer: React.FunctionComponent = () => {
    return <footer className="flex flex-wrap w-full">
        <div className="mx-[5%] lg:mx-[16.6%] w-full">
            <div className="border border-black dark:border-white w-full h-min" />
            <div className="flex w-full h-max justify-around">
                <FooterIcon iconSrc={<GitHub className="w-[20px] h-[20px]" />} alt="GitHub" link="https://github.com/chrehall68" />
                <FooterIcon iconSrc={<LinkedIn className="w-[20px] h-[20px]" />} alt="Linkedin" link="https://www.linkedin.com/in/christopher-eliot-hall" />
            </div>
        </div>
    </footer>
}