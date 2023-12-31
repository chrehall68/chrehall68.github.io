'use client';
import { Content } from "@/components/Content";
import { HeadedContainer } from "@/components/HeadedContainer";
import Image from "next/image";
import React from "react";


export const ClientLeetCodePage: React.FunctionComponent<React.PropsWithChildren> = props => {
    return <Content>
        <HeadedContainer title="LeetCode and NeetCode!!">
            <div className="flex flex-wrap w-full justify-center">
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
                {props.children}
            </div>

        </HeadedContainer>
    </Content>
}