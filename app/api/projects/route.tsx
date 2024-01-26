import { IProject } from "@/interfaces/IProject";
import { NextRequest, NextResponse } from "next/server";

const projects: IProject[] = [
    {
        title: "LeetCode",
        description: "Check out my LeetCode and NeetCode progress",
        id: "leetcode",
        imageSrc: "/leetcode.svg",
        highlighted: true,
    },
    {
        title: "Stanford Ribonanza RNA Folding",
        description: "A Kaggle competition where I won a silver medal",
        id: "ribonanza",
        imageSrc: "/ribonanza.webp",
        highlighted: true,
    },
    {
        title: "IBM Z Datathon",
        description: "A datathon where I won 2nd place",
        id: "ibmdatathon",
        imageSrc: "/IBM.svg"
    },
    {
        title: "IHSBoost",
        description: "A C++ library for robotic control and sensor integration",
        id: "ihsboost",
        imageSrc: "https://avatars.githubusercontent.com/u/42852455?s=400&u=6db3a963e0996de6dd7ac02ac8173afb86394860&v=4"
    },
    {
        title: "Enoch and C4T",
        description: "A class scheduling application for my volunteer organization",
        id: "enoch",
        imageSrc: "https://www.gitbook.com/cdn-cgi/image/width=288,height=288,fit=contain,format=auto/https%3A%2F%2F3062545790-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MHwF08Cx3vStZPAN4PD%252Favatar-1600886166237.png%3Fgeneration%3D1600886166749486%26alt%3Dmedia"
    },
    {
        title: "JavaBench",
        description: "Classic Data Structures and Algorithms in Java - Benchmarked.",
        id: "javabench",
        imageSrc: "/Swing.webp"
    },
    {
        title: "Coming Soon",
        description: "More projects coming soon",
        id: ""
    }
];

export async function GET(req: NextRequest) {
    return NextResponse.json(projects, { status: 200 });
}