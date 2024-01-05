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
        description: "A kaggle competition where I won a silver medal",
        id: "ribonanza",
        imageSrc: "/ribonanza.png",
        highlighted: true,
    },
    {
        title: "Yes",
        description: "Wooh yeah wooh yeah",
        id: "yes",
        imageSrc: "/IBM.svg"
    },
    {
        title: "Yes",
        description: "Wooh yeah wooh yeah",
        id: "yes",
    },
    {
        title: "Yes",
        description: "Something",
        id: "yes"
    }
];

export async function GET(req: NextRequest) {
    return NextResponse.json(projects, { status: 200 });
}