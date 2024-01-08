"use client";

import { Blog, Skill, SkillsUsed } from "@/components/Blog";
import { HeadedContainer } from "@/components/HeadedContainer";
import Link from "next/link";

export default function Page() {
    return <Blog title="IBM Z Datathon" brief="Hackathon hosted by IBM to use IBM Z systems and ML for good" dates="October 20-21, 2023">
        <p>
            This was my first hackathon, and I must say that it sure was something. Looking back
            on it, the whole thing was a real roller coaster that I'm lucky to have made it through.
            The whole datathon was focused on promoting &nquot;IBM Z systems&nquot; (IBM's enterprise
            computing systems). So, all participating teams were given an instance on which to
            deploy their ML solution. Here&apos;s how the datathon went:
        </p>
        <HeadedContainer title="Initial Idea" textSize="text-xl">
            <p className="pb-2">
                My initial idea was to use an LLM to explain tax legislation. I was going to fine-tune
                Llama 2 on tons of tax legislation articles from US government webpages and then
                deploy a quantized version of the fine-tuned model on the IBM Z system that we
                were given for our hackathon project.
            </p>
            <p className="pb-2">
                Unfortunately, I soon realized that this wouldn't work. First off,
                the unique IBM Z architecture posed a problem: there weren't prebuilt binaries
                of many packages that I wanted to use. More importantly, even when using a quantized version
                of my LLM and a package (compiled on my IBM Z instance) that executed model layers sequentially
                (check out <Link href="https://github.com/ggerganov/llama.cpp">llama.cpp</Link>),
                the container that my team was given didn't have enough RAM available to run the model.
            </p>
        </HeadedContainer>
        <HeadedContainer title="The Pivot" textSize="text-xl">
            <p className="pb-2">
                Because of these setbacks, we had to do a pivot. I asked my team what they were interested in pivoting to,
                and after a quick vote, we decided on making a content-moderation AI.
            </p>
            <p className="pb-2">
                Luckily, there were tons of existing datasets for content-moderation. This made finding data a breeze.
                As for the actual ML part, I just threw together a simple BERT classification model. Basically,
                text was passed as the input to a pretrained BERT model, and the BERT model's output's last hidden state
                was used as the input for a classification head that outputted whether or not text should be
                allowed on a platform or not.
            </p>
        </HeadedContainer>
        <HeadedContainer title="Results" textSize="text-xl">
            <p className="pb-2">
                Unfortunately, my team didn't have time to write the REST API that we planned to have on top of our model.
                Still, even with our incomplete solution, we somehow won 2nd place in the datathon. Go figure.
            </p>
            <p className="pb-2">
                Having experienced this as my first datathon, I now realize that the key to hackathons is to fail fast.
                I think that I invested too much time into trying to get our first plan working (I spent around 5 hours,
                which is almost 1/4 of the total datathon period) just for us to realize it wouldn't work. That time
                could've been spent finishing the REST API that we didn't get to finish.
            </p>
        </HeadedContainer>

        <SkillsUsed>
            <Skill name="Tensorflow" img="/tf.svg" brief="I used Tensorflow and Keras for the content-moderation model since Keras is full of functions that make model prototyping extremely fast and simple." />
        </SkillsUsed>
    </Blog>
}