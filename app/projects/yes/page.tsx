"use client";
import { Content } from "@/components/Content";
import React from "react";
import { CircularProgress, LinearProgress } from "@/components/NeetCodeCard/NeetCodeCard";

export default function Page() {
    return <Content>
        <svg className="w-[400px] h-[400px]">
            <CircularProgress total={150} current={100} delayMS={100} />
            <LinearProgress total={150} current={100} title="Easy" x="150" y="-15" delayMS={200} />
            <LinearProgress total={150} current={100} title="Medium" x="150" y="50" delayMS={300} />
            <LinearProgress total={150} current={100} title="Hard" x="150" y="100" delayMS={400} />
            <LinearProgress total={150} current={100} title="Super" x="150" y="150" delayMS={500} />
        </svg>
    </Content>
}
