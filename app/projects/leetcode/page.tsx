"use client";
import { NeetCode } from "@/interfaces/NeetCode";
import Image from "next/image";
import React from "react";
import { NeetCodeCard } from "@/components/NeetCodeCard/NeetCodeCard";
import { Loading } from "@/components/Loading";
import { Blog, Skill, SkillsUsed } from "@/components/Blog";
import Link from "next/link";

export default function NewClientLeetCodePage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState<NeetCode>({ solvedProblems: [[]], problems: [[]], topics: [] });

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

    // loading screen
    if (isLoading) {
        return <Loading />
    }

    // actual content
    return <Blog useLoader={true} title="LeetCode and NeetCode!" dates="December 2023 - January 2024" brief="A crash-course refresher on algorithms and data structures through NeetCode practice problems">
        <div className="flex flex-wrap w-full justify-center pb-4">
            <p >Check out my LeetCode stats! I try to do at least one LeetCode problem
                a week. Normally, I just do the daily LeetCode, but occasionally I do seek out problems
                based on their programming concepts. As you can see from the chart,
                it&apos;s mostly easy and medium problems that make sense to me right now.
            </p>
            <div className="my-4 w-full flex flex-wrap justify-center">
                <div className="w-full relative flex items-top justify-center">
                    <Image src="https://leetcard.jacoblin.cool/chrehall68?theme=unicorn&ext=activity" alt="leetcode" width={500} height={400} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw" />
                </div>
                <p className="italic text-sm">LeetCode stats fetched hourly</p>
            </div>
        </div>

        <div className="flex flex-wrap">
            <p className="w-full">
                Here are my NeetCode 150 stats! You can see the breakdown by category in the chart. I started
                doing NeetCode problems over my 2023-2024 winter break because one of my friends challenged
                me to complete all of them. As you can see, I&apos;m making good progress. My goal is to finish all
                NeetCode problems by Summer 2024. Check out my progress so far!
            </p>
            <div className="my-4 w-full flex flex-wrap justify-center">
                <div className="w-full max-h-[40vh] flex justify-center" >
                    <NeetCodeCard nc={data} />
                </div>
                <p className="italic text-sm">NeetCode stats fetched every 5 minutes; Problems credit to <Link href="https://neetcode.io/practice">NeetCode.io</Link></p>
            </div>
            <p className="pb-2">
                Honestly, going through the NeetCode 150 was a really good experience for me.
                I took a class on Data Structures and Algorithms a while ago, so topics like Binary Search,
                Trees, Linked Lists, and Stacks all went very smoothly for me. As for topics like Greedy Algorithm
                Design, and Sliding Windows, this challenge refamiliarized me with those crucial skills.
            </p>
            <p className="pb-2">
                I think the best part of going through the NeetCode 150 was finally wrapping my head around 2D DP.
                I&apos;d been doing 1D DP problems prior to starting this challenge, and so 1D problems went like
                clockwork for me. However, I&apos;d never done a 2D DP problem successfully (at least not in the DP way;
                I may have cheesed them using <code>functools.lru_cache</code>), but doing this challenge pushed
                me to read several online articles to finally start to get a small grasp and then do a bunch of practice
                problems to cement those thought patterns into my mind.
            </p>
            <p className="pb-2">
                Overall, I would definitely recommend the NeetCode 150. It helped me brush up on my
                skills so much. Hopefully, those skills will land me an internship 🤞🤞. Till then, may your
                code always run first try!
            </p>
        </div>

        <SkillsUsed>
            <Skill img="/python.svg" name="Python" brief="Python is my go-to language for leetcode. It may not be the fastest language, but it is great for prototyping" />
            <Skill img="/cpp.svg" name="C++" brief="While not my go-to language, I like using c++ once I've come up with an idea for an optimal solution and got promising results in Python. After all, C++ is just soooo much faster :>" />
        </SkillsUsed>
    </Blog>
}