"use client";

import { Blog, Skill, SkillsUsed } from "@/components/Blog";
import { HeadedContainer } from "@/components/HeadedContainer";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return <Blog title="IBM Z Datathon" brief="Hackathon hosted by IBM to use IBM Z systems and ML for good" dates="October 20-21, 2023" github="https://github.com/chrehall68/SSF23-CodeCatalysts">
        <p className="pb-2">
            This was my first hackathon, and I must say that it sure was something. Looking back
            on it, the whole thing was a real roller coaster that I&apos;m lucky to have made it through.
            The whole datathon was focused on promoting &quot;IBM Z systems&quot; (IBM&apos;s enterprise
            computing systems). So, all participating teams were given an instance on which to
            deploy their ML solution. I&apos;ll walk you through how the datathon went.
        </p>
        <HeadedContainer title="Background" textSize="text-xl">
            <p className="pb-2">It all started when my school&apos;s CS department sent out an email encouraging all
                undergraduate students to participate in the &quot;IBM Z Datathon,&quot; which they promised
                would be an amazing learning experience that would enhance our resumes.
            </p>
            <div className="flex flex-wrap justify-center w-full my-2">
                <Image height="669" width="517" src="/IBMZDatathon.webp" className="h-max-[50%] lg:h-max-[30%]" alt="flyer" />
                <p className="italic text-sm w-full text-center">IBM Z Datathon Flyer</p>
            </div>
            <p className="pb-2">
                Given that I was pretty free at the time, I decided to sign up.
                There was just one problem: to sign up, I had to come up with an idea.
            </p>
            <p className="pb-2">
                My initial idea was to use an LLM to explain tax legislation. I was going to fine-tune
                Llama 2 on tons of tax legislation articles from US government webpages and then
                deploy a quantized version of the fine-tuned model on the IBM Z system that we
                were given for our hackathon project.
            </p>
        </HeadedContainer>
        <HeadedContainer title="The Pivot" textSize="text-xl">
            <p className="pb-2">
                Unfortunately, when the day of the datathon rolled around, I quickly realized that this wouldn&apos;t work. First off,
                the unique IBM Z architecture posed a problem: there weren&apos;t prebuilt binaries
                of many packages that I wanted to use. More importantly, even when using a quantized version
                of my LLM and a package (compiled on my IBM Z instance) that executed model layers sequentially
                (check out <Link href="https://github.com/ggerganov/llama.cpp" className="underline">llama.cpp</Link>),
                the container that my team was given didn&apos;t have enough RAM available to run the model.
            </p>
            <p className="pb-2">
                Because of these setbacks, we had to do a pivot. I asked my team what they were interested in pivoting to,
                and after a quick vote, we decided on making a content-moderation AI.
            </p>
            <p className="pb-2">
                Luckily, there were tons of existing datasets for content-moderation. This made finding data a breeze.
                As for the actual ML part, I just threw together a simple BERT classification model. Basically,
                text was passed as the input to a pretrained BERT model, and the BERT model&apos;s output&apos;s last hidden state
                was used as the input for a classification head that outputted whether or not text should be
                allowed on a platform or not.
            </p>
            <p className="pb-2">
                From there, the only thing left to do was get the model to do inference when running on the IBM Z platform (one
                of the requirements for the datathon). Surprisingly, this turned out to be one of the hardest parts of the project.
                Once again, the proprietary IBM Z architecture was to blame. Not only was it Big Endian (while most systems nowadays
                are little endian), but it was also running on older PyTorch binaries. This meant that all attempts to load the model
                on our IBM Z instance resulted in nonsensical values (although technically, the loaded values weren&apos;t 100% nonsensical
                since the bytes themselves were the same, just the byte order was wrong). The Stack Overflow solution was to update PyTorch,
                but there was no way we could do that without compiling from source (once again, blame the architecture), and the machine
                didn&apos;t have enough resources to compile PyTorch from source. Worse yet, I couldn&apos;t even cross compile PyTorch because the compiler
                was proprietary too! After a lot of frantic brainstorming, I came up with the solution - just reverse the byte order
                when saving the model on my local machine. It took a while to implement since I had to make it work with PyTorch&apos;s saving method,
                but in the end, it worked!
            </p>
        </HeadedContainer>
        <HeadedContainer title="Results" textSize="text-xl">
            <p className="pb-2">
                In the end, my team didn&apos;t have time to write the REST API that we planned to have on top of our model.
                We ran into too many hiccups to get anywhere close to that.  Still, even with our incomplete solution,
                we somehow won 2nd place in the datathon. Go figure.
            </p>
            <p className="pb-2">
                Having experienced this as my first datathon, I now realize that the key to hackathons is to fail fast.
                I think that I invested too much time into trying to get our first plan working (I spent around 5 hours,
                which is almost 1/4 of the total datathon period) just for us to realize it wouldn&apos;t work. That time
                could&apos;ve been spent finishing the REST API that we didn&apos;t get to finish.
            </p>
        </HeadedContainer>

        <SkillsUsed>
            <Skill name="Tensorflow" img="/tf.svg" brief="I used Tensorflow and Keras for the content-moderation model since Keras is full of functions that make model prototyping extremely fast and simple." />
        </SkillsUsed>
    </Blog>
}