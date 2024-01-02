'use client';
import { Content } from "@/components/Content";
import { HeadedContainer } from "@/components/HeadedContainer";
import { NeetCode } from "@/interfaces/NeetCode";
import Image from "next/image";
import React from "react";
import { LinearProgress, CircularProgress } from "@/components/SVGComponents";

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

function generateImage(nc: NeetCode) {
    let elements: JSX.Element[] = [];
    nc.topics.forEach(
        (topic, idx) => {
            elements.push(
                <svg key={idx} height="50" width="200" className="m-2"><LinearProgress total={nc.solvedProblems[idx]?.length || 0} current={numSolveTopic(nc, topic)} title={topic}
                /></svg>
            )
        }
    )
    return <div>
        <svg width={100} height={100}><CircularProgress total={150} current={numSolved(nc)} /></svg>
        <div className="flex flex-wrap">
            {elements}
        </div>
    </div>
}

function generateFull(nc: NeetCode) {
    let ret: JSX.Element[] = []
    nc.topics.forEach(
        (topic, index) => {
            let problems: JSX.Element[] = []

            nc.problems[index].forEach(
                (problem, idx) => problems.push(<li key={index * 100 + idx}>{problem} : {nc.solvedProblems[index].at(idx) ? "Solved" : "Not Solved"}</li>)
            )

            ret.push(
                <div key={index}>
                    <p>{topic}</p>
                    {problems}
                </div>
            )
        }
    )

    return <div>
        {generateImage(nc)}
        {ret}
    </div>
}

export default function ClientLeetCodePage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState<NeetCode>({ solvedProblems: [[]], problems: [[]], topics: [] });

    // run the fetch
    React.useEffect(
        () => {
            fetch("/api/neetcode").then(
                resp => {
                    resp.json().then(
                        parsed => {
                            console.log("got parsed json", parsed);
                            setData(parsed);
                            setIsLoading(false);
                        }
                    )
                }
            )
        }, []
    )

    if (isLoading) {
        return <div role="status" className="w-full flex items-center justify-center">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }

    return <Content>
        <HeadedContainer title="LeetCode and NeetCode!!">
            <div className="flex flex-wrap w-full justify-center pb-2">
                <p className="lg:w-1/2">Check out my LeetCode stats! I try to do at least one LeetCode problem
                    a week. Normally, I just do the daily LeetCode, but occasionally I do seek out problems
                    based on their programming concepts. As you can see from the chart,
                    it&apos;s mostly easy and medium problems that make sense to me right now.
                </p>
                <div className="w-5/6 lg:w-1/2 h-[40vh] relative flex items-top">
                    <Image src="https://leetcard.jacoblin.cool/chrehall68?theme=unicorn&ext=activity" alt="leetcode" fill />
                </div>
            </div>
            <div className="flex flex-wrap w-full">
                <p>Here are my NeetCode 150 stats! You can see the breakdown by category in the chart, and you
                    can view the individual problems below the chart.
                </p>
                {generateFull(data)}
            </div>

        </HeadedContainer>
    </Content>
}