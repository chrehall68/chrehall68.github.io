"use client";
import { Content } from "@/components/Content";
import React from "react";

interface ProgressProps {
    total: number,
    current: number,
    title?: string,
    x?: string | number,
    y?: string | number,
}

const CircularProgress: React.FunctionComponent<ProgressProps> = props => {
    const [pct, setPct] = React.useState(0);
    const r = 40;
    const c = Math.PI * (r * 2);

    // update progress
    React.useEffect(
        () => {
            setPct(props.current / props.total * 100)
        }
    )

    return <g style={{ transform: `translateX(${props.x ? props.x : 0}px) translateY(${props.y ? props.y : 0}px)` }}>
        {/**Background Circle */}
        <circle
            className="stroke-gray-300"
            strokeWidth="10"
            cx="50"
            cy="50"
            r={r}
            fill="transparent"
        ></circle>
        {/** Progress Bar Circle */}
        <circle
            className={"stroke-orange-500 [transition:stroke-dashoffset_.5s]"}
            strokeWidth="10"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r={r}
            fill="transparent"
            strokeDashoffset={(100 - pct) / 100 * c}
            strokeDasharray={Math.round(c)}
        ></circle>

        {/** Text */}
        <text x="50" y="50" fontSize="12" textAnchor="middle" alignmentBaseline="middle" className="fill-white z-4">{props.current}/{props.total}</text>
    </g>
}

const LinearProgress: React.FunctionComponent<ProgressProps> = props => {
    const [pct, setPct] = React.useState(0);
    const length = 200;

    React.useEffect(
        () => setPct(props.current / props.total * 100)
    )

    return <g style={{ transform: `translateX(${props.x ? props.x : 0}px) translateY(${props.y ? props.y : 0}px)` }}>
        <text y="30" x="0" textAnchor="start" fontSize="12" className="fill-white">{props.title}</text><text y="30" x={length} textAnchor="end" fontSize="12" className="fill-white">{props.current}/{props.total}</text>
        <line strokeWidth="5" y1="45" y2="45" x1="0" x2={length} className="stroke-gray-300" />
        <line strokeWidth="5" y1="45" y2="45" x1="0" x2={length} strokeLinecap="round" strokeDasharray={length} strokeDashoffset={(100 - pct) / 100 * length} fill="transparent" className="stroke-green-500 [transition:stroke-dashoffset_.5s_linear]" />
    </g>
}

export default function Page() {
    return <Content>
        <svg className="w-[400px]">
            <CircularProgress total={150} current={100} />
            <LinearProgress total={150} current={100} title="Easy" x="150" y="-15" />
        </svg>
    </Content>
}
