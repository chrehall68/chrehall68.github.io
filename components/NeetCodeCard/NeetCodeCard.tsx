"use client";
import "./style.css"
import React from "react";
import { NeetCode } from "@/interfaces/NeetCode";

interface ProgressProps {
    total: number,
    current: number,
    title?: string,
    x?: string | number,
    y?: string | number,
    delayMS?: string | number,
    fadeInMS?: string | number,
    fill?: string,
}

export const CircularProgress: React.FunctionComponent<ProgressProps> = props => {
    const [waiting, setWaiting] = React.useState(true);
    const [pct, setPct] = React.useState(0);
    const r = 40;
    const c = Math.PI * (r * 2);

    const total = props.total;
    const current = props.current;
    const delayMS = props.delayMS ? Number(props.delayMS) : 100;
    const fadeInMS = props.fadeInMS ? Number(props.fadeInMS) : 300;

    // update progress
    React.useEffect(
        () => {
            if (waiting) {
                // 0.3 is the fade-in time
                const int = window.setInterval(() => setWaiting(false), delayMS + fadeInMS)
                return () => window.clearInterval(int)
            }
            else {
                setPct(current / total * 100)
            }
        }, [waiting, delayMS, fadeInMS, current, total]
    )


    return <g style={{ opacity: 0, transform: `translateX(${props.x ? props.x : 0}px) translateY(${props.y ? props.y : 0}px)`, animation: `fadeIn ${fadeInMS}ms ${delayMS}ms ease 1 forwards` }}>
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
            className={"stroke-orange-500 [transition:stroke-dashoffset_.5s_linear]"}
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
        <text x="50" y="50" fontSize="12" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle" fill={props.fill ? props.fill : "white"} className="z-4">{props.current}/{props.total}</text>
    </g>
}

export const LinearProgress: React.FunctionComponent<ProgressProps> = props => {
    const [waiting, setWaiting] = React.useState(true);
    const [pct, setPct] = React.useState(0);
    const length = 150;

    const total = props.total;
    const current = props.current;
    const delayMS = props.delayMS ? Number(props.delayMS) : 100;
    const fadeInMS = props.fadeInMS ? Number(props.fadeInMS) : 300;

    React.useEffect(
        () => {
            if (waiting) {
                const int = window.setInterval(() => setWaiting(false), delayMS + fadeInMS);
                return () => window.clearInterval(int);
            }
            setPct(current / total * 100);
        }, [waiting, delayMS, fadeInMS, current, total]
    )

    return <g style={{ opacity: 0, transform: `translateX(${props.x ? props.x : 0}px) translateY(${props.y ? props.y : 0}px)`, animation: `fadeIn ${fadeInMS}ms ${delayMS}ms ease 1 forwards` }}>
        <text y="30" x="0" textAnchor="start" fontSize="12" fontWeight="bold" fill={props.fill ? props.fill : "white"}>{props.title}</text><text y="30" x={length} textAnchor="end" fontSize="12" fontWeight="bold" fill={props.fill ? props.fill : "white"}>{props.current}/{props.total}</text>
        <line strokeWidth="5" y1="45" y2="45" x1="0" x2={length} className="stroke-gray-300" strokeLinecap="round" />
        <line strokeWidth="5" y1="45" y2="45" x1="0" x2={length} strokeLinecap="round" strokeDasharray={length} strokeDashoffset={(100 - pct) / 100 * length} fill="transparent" className="stroke-green-500 [transition:stroke-dashoffset_.5s_linear]" />
    </g>
}


function numSolved(nc: NeetCode) {
    let count = 0;
    nc.topics.forEach(
        (_, idx) => {
            nc.solvedProblems[idx].forEach(problem => count += (problem ? 1 : 0))
        }
    )
    return count;
}

function numSolveTopic(nc: NeetCode, topic: string) {
    let count = 0;
    nc.solvedProblems[nc.topics.indexOf(topic)].forEach(el => count += (el ? 1 : 0))
    return count;
}

export function NeetCodeCard({ nc, delayMS }: { nc: NeetCode, delayMS?: number }) {
    const extraDelay = delayMS ? delayMS : 0;

    let linears: JSX.Element[] = [];

    // helpers to get X and Y pos of the linear progress bars
    const getX = (col: number) => 175 * col + 25;
    const getY = (row: number) => 50 * row;

    // idx inside topics, row/col inside figure
    let idx = 0;
    let row = 0;
    let col = 0;

    // do the 4 next to the circle bar
    for (idx = 0; idx < 4; ++idx) {
        row = Math.floor(idx / 2);
        col = (idx % 2) + 1;

        linears.push(<LinearProgress total={nc.solvedProblems[idx].length} current={numSolveTopic(nc, nc.topics[idx])} title={nc.topics[idx]} x={getX(col)} y={getY(row)} delayMS={(idx + 1) * 100 + extraDelay} fill="url(#svg-text)" key={idx} />)
    }
    // do every row except the last row
    for (idx = 4; idx < nc.topics.length - 2; ++idx) {
        row = Math.floor((idx - 4) / 3) + 2;
        col = (idx - 4) % 3;

        linears.push(<LinearProgress total={nc.solvedProblems[idx].length} current={numSolveTopic(nc, nc.topics[idx])} title={nc.topics[idx]} x={getX(col)} y={getY(row)} delayMS={(idx + 1) * 100 + extraDelay} fill="url(#svg-text)" key={idx} />)
    }
    // do the last row, but center it
    for (idx = nc.topics.length - 2; idx < nc.topics.length; ++idx) {
        row = Math.floor((idx - 4) / 3) + 2;
        col = (idx - 4) % 3;
        let colOffset = Math.floor(getX(1) / 2);

        linears.push(<LinearProgress total={nc.solvedProblems[idx].length} current={numSolveTopic(nc, nc.topics[idx])} title={nc.topics[idx]} x={getX(col) + colOffset} y={getY(row)} delayMS={(idx + 1) * 100 + extraDelay} fill="url(#svg-text)" key={idx} />)
    }

    return <svg viewBox="0 0 552 377" className="w-full">
        <defs>
            <linearGradient x1="0" y1="0" x2="1" y2="0" id="svg-bg">
                <stop offset="0" stopColor="#dbeafe" id="_4" />
                <stop offset="0.5" stopColor="#e0e7ff" id="_5" />
                <stop offset="1" stopColor="#fae8ff" id="_6" />
            </linearGradient>
            <linearGradient x1="0" y1="0" x2="1" y2="0" id="svg-text">
                <stop offset="0" stopColor="#2563eb" id="_7" />
                <stop offset="0.5" stopColor="#4f46e5" id="_8" />
                <stop offset="1" stopColor="#d946ef" id="_9" />
            </linearGradient>
        </defs>
        <rect width="550" height="375" fill="url(#svg-bg)" rx="4" strokeWidth="1" stroke="url(#svg-text)" />
        <CircularProgress x="50" y="15" total={150} current={numSolved(nc)} fill="url(#svg-text)" delayMS={extraDelay} />
        {linears}
    </svg>
}