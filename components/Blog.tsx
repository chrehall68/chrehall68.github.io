import { Content } from "@/components/Content";
import { HeadedContainer } from "@/components/HeadedContainer";
import { CalendarDaysIcon } from "@heroicons/react/16/solid";
import { GitHub } from "./svgs";
import Link from "next/link";
import Image from "next/image";

export interface SkillProps {
    name: string,
    img: string,
    brief: string
}
export const Skill: React.FunctionComponent<SkillProps> = props => {
    return <div className="shadow rounded-xl p-4 flex flex-wrap justify-center w-[50vw] md:w-[25vw] lg:w-[20vw] m-4 bg-gray-300/50 dark:bg-gray-800/50">
        <div className="w-full flex items-center justify-center">
            <Image src={props.img} width={48} height={48} alt="image" />
        </div>
        <p className="text-center pb-2 text-lg">{props.name}</p>
        <p className="italic">{props.brief}</p>
    </div>
}

export const SkillsUsed: React.FunctionComponent<React.PropsWithChildren> = props => {
    return <HeadedContainer title="Skills Used" textSize="text-2xl">
        <div className="pt-2 flex flex-wrap justify-center">
            {props.children}
        </div>
    </HeadedContainer>
}

export interface BlogProps extends React.PropsWithChildren {
    github?: string,
    title: string,
    brief?: string,
    dates: string,
    useLoader?: boolean, // whether or not the content should use a loader
}

export const Blog: React.FunctionComponent<BlogProps> = props => {
    return <Content useLoader={props.useLoader}>
        <HeadedContainer title={props.title} className="w-full">
            <div className="flex w-full">
                {/** Actual Blog Post Content */}
                <div className="w-3/4 pr-2 lg:pr-8">
                    {props.children}
                </div>

                {/** Sticky GitHub links */}
                <div className="w-1/4">
                    <div className="p-2 lg:px-8 sticky top-[15vh] bg-gray-500/30 rounded-xl w-full">
                        <p>{props.title}</p>
                        <div className="w-full border-black dark:border-white border my-2" />
                        <p className="italic pb-2">{props.brief}</p>
                        <div className="flex flex-row w-full justify-start items-center">
                            <CalendarDaysIcon className="w-[20%] p-2" />
                            <p className="w-[80%] italic max-sm:break-all break-words">{props.dates}</p>
                        </div>
                        {props.github ?
                            <Link href={props.github} className="flex w-full justify-start items-center">
                                <GitHub className="w-[20%] p-2" />
                                <p className="w-[80%] max-sm:break-all break-words">Project GitHub</p>
                            </Link> : null}
                    </div>
                </div>
            </div>
        </HeadedContainer>
    </Content>
}