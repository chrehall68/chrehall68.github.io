import { Icon } from "./Icon";
import React from "react";

export const Footer: React.FunctionComponent = () => {
    return <footer className="flex flex-wrap w-full">
        <div className="mx-[5%] lg:mx-[16.6%] w-full">
            <div className="border border-black dark:border-white w-full h-min" />
            <div className="flex w-full h-max justify-around">
                <Icon darkSrc="/github-mark-white.svg" whiteSrc="/github-mark.svg" alt="GitHub" size={20} link="https://github.com/chrehall68" />
                <Icon darkSrc="/linkedin-white.svg" whiteSrc="/linkedin.svg" alt="Linkedin" size={20} link="https://www.linkedin.com/in/christopher-eliot-hall" />
            </div>
        </div>
    </footer>
}