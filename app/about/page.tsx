'use client'
import { Content } from "@/components/Content"
import { HeadedContainer } from "@/components/HeadedContainer"
import { Timeline } from "@/components/Timeline"
import { BeakerIcon, MusicalNoteIcon, TvIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import React from "react"
import Image from "next/image"

export default function About() {
    return <Content>
        <HeadedContainer title="About Me">
            {/** Quick Intro */}
            <div className="flex flex-inline w-full pb-2 items-center">
                <p className="w-2/3 prose xl:px-[16.6%]">
                    Hi there! My name is Christopher Eliot Hall, but I go by Eliot most of the time. I&apos;m a
                    full time student getting my Bachelors of Science in Computer Science at
                    San Jose State University. I&apos;m currently a Freshman, but I&apos;m hoping to graduate
                    by Fall 2026 (a semester early).
                </p>
                <img src="/headshot.png" alt="headshot" className="w-1/3 h-min rounded-full" />

            </div>

            {/** Hobbies */}
            <div>
                <p>I spend most of my time working on fascinating coding projects
                    (check out my <Link href="/projects">project page</Link>) or completing schoolwork (graduating early
                    isn&apos;t easy). That doesn&apos;t mean I don&apos;t get breaks, though! When I do get a break,
                    I like to spend my time:
                </p>
                <div className="flex flex-wrap justify-start lg:justify-around space-around">
                    <span className="flex flex-inline items-center w-min my-2 mx-8">
                        <BeakerIcon className="w-4 h-4 mr-1" /><p className="w-max">Cooking!</p>
                    </span>
                    <span className="flex flex-inline items-center w-min my-2 mx-8">
                        <MusicalNoteIcon className="w-4 h-4 mr-1" /><p className="w-max">Playing the piano!</p>
                    </span>
                    <span className="flex flex-inline items-center w-min my-2 mx-8">
                        <TvIcon className="w-4 h-4 mr-1" /><p className="w-max">Gaming </p>
                    </span>

                </div>
            </div>

            {/** Timeline */}
            <div>
                <p>To learn more about my experiences, check out the timeline below.</p>
            </div>
            <Timeline entries={[
                { title: "Started IHS", description: "I started Independence High School", src: "/ihs.png", date: "Fall 2019" },
                { title: "San Jose State", description: "I attended it", src: "/SJSU.svg", date: "Fall 2023" },
                { title: "Ribonanza", description: "2nd place", src: "/SJSU.svg", date: "October 2023" }
            ]} />
        </HeadedContainer>
    </Content>
}