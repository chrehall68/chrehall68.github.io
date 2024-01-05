"use client";
import { Content } from "@/components/Content";
import { HeadedContainer } from "@/components/HeadedContainer";
import { NeetCode } from "@/interfaces/NeetCode";
import Image from "next/image";
import React from "react";
import { NeetCodeCard } from "@/components/NeetCodeCard/NeetCodeCard";
import { Loading } from "@/components/Loading";

export default function ClientLeetCodePage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState<NeetCode>({ solvedProblems: [[]], problems: [[]], topics: [] });
    const [mobile, setMobile] = React.useState(true);

    // run the fetch
    React.useEffect(
        () => {
            fetch("/api/neetcode").then(
                resp => {
                    resp.json().then(
                        parsed => {
                            setData(parsed);
                            setIsLoading(false);
                        }
                    )
                }
            )
        }, []
    )

    // display the correct layout
    React.useEffect(
        () => {
            const f = () => setMobile(window.innerWidth < 1024);
            f();
            window.addEventListener("resize", f);
            return () => window.removeEventListener("resize", f)
        }, []
    )

    // loading screen
    if (isLoading) {
        return <Loading />
    }

    // actual content
    return <Content>
        <HeadedContainer title="LeetCode and NeetCode!!">
            <div className="flex flex-wrap w-full justify-center pb-4">
                <p className="lg:w-1/2">Check out my LeetCode stats! I try to do at least one LeetCode problem
                    a week. Normally, I just do the daily LeetCode, but occasionally I do seek out problems
                    based on their programming concepts. As you can see from the chart,
                    it&apos;s mostly easy and medium problems that make sense to me right now.
                </p>
                <div className="w-5/6 lg:w-1/2 h-[40vh] relative flex items-top">
                    <Image src="https://leetcard.jacoblin.cool/chrehall68?theme=unicorn&ext=activity" alt="leetcode" fill />
                </div>
            </div>
            {mobile ?
                (
                    // mobile view
                    <div className="flex flex-wrap">
                        <p className="w-full">Here are my NeetCode 150 stats! You can see the breakdown by category in the chart. My goal is
                            to finish all NeetCode problems by Summer 2024. Check out my progress so far!
                        </p>
                        <div className="w-full max-h-[40vh] flex justify-center" >
                            <NeetCodeCard nc={data} />
                        </div>
                    </div>
                ) :
                (
                    // desktop view
                    <div className="flex flex-inline">
                        <div className="w-1/2 flex justify-start" >
                            <NeetCodeCard nc={data} />
                        </div>
                        <p className="w-1/2 text-left px-2">Here are my NeetCode 150 stats! You can see the breakdown by category in the chart. My goal is
                            to finish all NeetCode problems by Summer 2024. Check out my progress so far!
                        </p>
                    </div>
                )
            }
        </HeadedContainer>
    </Content>
}