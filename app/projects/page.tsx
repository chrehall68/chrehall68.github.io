"use client"
import { Content } from "@/components/Content";
import { HeadedContainer } from "@/components/HeadedContainer";
import { Loading } from "@/components/Loading";
import { Project } from "@/components/Project";
import { IProject } from "@/interfaces/IProject";
import React, { useEffect } from "react";


export default function Projects() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [projects, setProjects] = React.useState<IProject[]>([]);

    useEffect(
        () => {
            fetch("/api/projects").then(
                resp => resp.json().then(
                    parsed => {
                        setProjects(parsed);
                        setIsLoading(false);
                    }
                )
            )
        },
        []
    )

    if (isLoading) {
        return <Loading />;
    }
    return <Content useLoader={true}>
        <HeadedContainer title="Projects">
            <p>Here you can learn more about the projects I&apos;ve done</p>

            <div className="flex flex-wrap justify-around items-center">
                {projects.map((proj, idx) => <Project key={idx} title={proj.title} description={proj.description} imageSrc={proj.imageSrc} id={proj.id} />)}
            </div>
        </HeadedContainer>
    </Content>
}