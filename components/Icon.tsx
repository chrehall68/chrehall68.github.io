import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface IconProps {
    whiteSrc: string,
    darkSrc: string,
    link: string,
    alt: string,
    size: number,
}

export const Icon: React.FunctionComponent<IconProps> = props => {
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
