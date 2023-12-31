"use client"
import { Content } from "@/components/Content";
import { HeadedContainer } from "@/components/HeadedContainer";
import { Project } from "@/components/Project";


export default function Projects() {
    return <Content>
        <HeadedContainer title="Projects">
            <p>Here you can learn more about the projects I&apos;ve done</p>

            <div className="flex flex-wrap justify-around items-center">
                <Project title="Yes" description="Wooh yeah wooh yeah" id="yes" />
                <Project title="Yes" description="Wooh yeah wooh yeah" id="yes" src="/IBM.svg" />
                <Project title="Yes" description="Wooh yeah wooh yeah" id="yes" src="/codebg.png" />
                <Project title="Leetcode" description="Check out my LeetCode and NeetCode progress" id="leetcode" src="/leetcode.svg" />
            </div>
        </HeadedContainer>
    </Content>
}