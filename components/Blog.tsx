import { Content } from "@/components/Content";
import { HeadedContainer } from "@/components/HeadedContainer";
import Link from "next/link";
import { Icon } from "./Icon";

export interface BlogProps extends React.PropsWithChildren {
    github: string,
    title: string,
    brief?: string,
}

export const Blog: React.FunctionComponent<BlogProps> = props => {
    return <Content >
        <HeadedContainer title={props.title}>
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
                        <p className="italic">{props.brief}</p>
                        <div className="hidden xl:flex">
                            <Icon darkSrc="/github-mark-white.svg" whiteSrc="/github-mark.svg" alt="Project GitHub" size={20} link={props.github} />
                        </div>
                        <div className="flex xl:hidden">
                            <Icon darkSrc="/github-mark-white.svg" whiteSrc="/github-mark.svg" alt="Project" size={16} link={props.github} />
                        </div>
                    </div>
                </div>
            </div>
        </HeadedContainer>
    </Content>
}