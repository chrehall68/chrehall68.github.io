"use client";
import { Content } from "@/components/Content";
import { HeadedContainer } from "@/components/HeadedContainer";
import { Timeline } from "@/components/Timeline";
import { BeakerIcon, MusicalNoteIcon, TvIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  // hobbies are like this so that they can be easily
  // reused depending on whether mobile or desktop layout
  // is being used
  let hobbies = (
    <div>
      <p>
        I spend most of my time working on fascinating coding projects (check
        out my{" "}
        <Link href="/projects" className="underline">
          project page
        </Link>
        ) or completing schoolwork (graduating early isn&apos;t easy). That
        doesn&apos;t mean I don&apos;t get breaks, though! When I do get a
        break, I like to spend my time:
      </p>
      <div className="flex flex-wrap justify-start lg:justify-around space-around">
        <span className="flex flex-inline items-center w-min my-2 mx-8">
          <BeakerIcon className="w-4 h-4 mr-1" />
          <p className="w-max">Cooking!</p>
        </span>
        <span className="flex flex-inline items-center w-min my-2 mx-8">
          <MusicalNoteIcon className="w-4 h-4 mr-1" />
          <p className="w-max">Playing the piano!</p>
        </span>
        <span className="flex flex-inline items-center w-min my-2 mx-8">
          <TvIcon className="w-4 h-4 mr-1" />
          <p className="w-max">Gaming!</p>
        </span>
      </div>
      <p>To learn more about my experiences, check out the timeline below.</p>
    </div>
  );

  return (
    <Content>
      <HeadedContainer title="About Me">
        {/** Quick Intro */}
        <div className="flex flex-inline w-full pb-2 items-center">
          <div className="w-2/3 pr-2">
            <p className="pb-2">
              Hi there! My name is Christopher Eliot Hall, but I go by Eliot
              most of the time. I&apos;m a full time student getting my
              Bachelors of Science in Computer Science at San Jose State
              University. I&apos;m currently a Freshman, but I&apos;m hoping to
              graduate by Fall 2026 (a semester early).
            </p>
            {/** Hobbies Desktop */}
            <div className="hidden lg:flex">{hobbies}</div>
          </div>
          <div className="relative w-1/3 h-auto aspect-square">
            <Image
              src="/headshot.webp"
              alt="headshot"
              fill
              className="rounded-full object-cover"
            />
          </div>
        </div>

        {/** Hobbies Mobile */}
        <div className="lg:hidden">{hobbies}</div>

        {/** Timeline */}
        <Timeline
          entries={[
            {
              title: "MIT Beaverworks",
              bullets: [
                "Earned the “Dr. Bob Berman Award” for creating personalized explanations and examples to assist other students",
                "Developed an AI to play a zombie outbreak game using OpenAI gym and Stable Baselines PPO algorithm",
              ],
              description:
                "Normally, this is a 4-week in-person event. However, when I attended MIT's Beaver Works Summer Institute, Covid- 19 cases were still rampant, so my time was online.That didn't stop me from making the most of the experience, though.During my time, I: ",
              date: "Summer 2022",
              src: "/bwsi.webp",
            },
            {
              title: "IHSBoost",
              bullets: [
                "Utilized CMake to create a C++ library with Python bindings, enabling faster prototyping",
                "Implemented custom threading, sensor, and movement classes, facilitating modular, object-oriented software",
                "Deployed a CI/CD pipeline to auto-deploy documentation to GitHub Pages and build the Debian package",
              ],
              description:
                "In my Senior year of high school, I created a library for my robotics team.",
              date: "Spring 2023",
              src: "https://avatars.githubusercontent.com/u/42852455?s=48&v=4",
            },
            {
              title: "Graduated IHS",
              description:
                "I graduated from Independence High School as Summa Cum Laude and Valedictorian out of my class of over 600 students.",
              src: "/ihs.webp",
              date: "May 2023",
            },
            {
              title: "SJSU",
              description:
                "I started attending San Jose State University, joining several clubs, including:",
              bullets: [
                "SJSU ML Club - Project Member",
                "Society of Computer Engineers - Development Officer for AI applications",
                "Computer Science Club - Hardware and IOT Member",
                "SJSU Robotics - Member on the Intelligent Systems and Embedded Firmware divisions",
              ],
              src: "/SJSU.svg",
              date: "Fall 2023",
            },
            {
              title: "IBM Z Datathon",
              description:
                "This was a 24 hour remote hackathon. Besides being the first hackathon I attended, it also stands out because, during the competition, I:",
              bullets: [
                "Remotely fine-tuned and deployed a BERT model using TensorFlow on the Linux-based IBM Z systems",
                "Collected, cleaned, and modified a hate-speech dataset, weighting labels to counter its label imbalance",
                "Outperformed 100+ teams and won a silver medal for my approach to hate-speech detection",
              ],
              src: "/IBM.svg",
              date: "October 2023",
            },
            {
              title: "Stanford Ribonanza",
              description:
                "As a member of SJSU's ML Club, I met a couple club members interested in biology.Together, we found this competition and decided to compete, doing surprisingly well.The competition was a two- month - long Kaggle competition, during which I:",
              bullets: [
                "Collaborated with two others to model RNA 3D structures, outperforming 700+ teams and winning a silver medal",
                "Reduced model MAE by over 50% by writing a custom transformer in PyTorch and parallelizing our training loop",
                "Designed a 75% faster data preprocessing pipeline to extract meaningful features, further reducing model MAE",
              ],
              src: "/ribonanza.webp",
              date: "October 2023 - December 2023",
            },
          ]}
        />
      </HeadedContainer>
    </Content>
  );
}
