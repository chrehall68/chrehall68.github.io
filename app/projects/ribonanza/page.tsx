import { Blog, Skill, SkillsUsed } from "@/components/Blog";
import { HeadedContainer } from "@/components/HeadedContainer";
import Image from "next/image";

export default function Ribonanza() {
    return <Blog title="Stanford Ribonanza RNA Folding" github="https://github.com/chrehall68/sjsu-ml-f23-ribonanza" brief="Learning to fold RNA sequences with PyTorch and Transformers" dates="October 2023 - December 2023">
        <div className="pb-2">
            <p className="italic pb-2 mx-[16.6%]">
                Your goal: to create a model that predicts the structures of any RNA molecule and the resulting chemical mapping profile, which can be compared to data collected for each position in the RNA.
                It&apos;s possible that every biologist and biotechnologist in the world could one day use your algorithmic solution.
            </p>
            <p className="text-right mx-[16.6%]">
                - Kaggle competition description
            </p>
        </div>
        <div className="pb-2">
            <p>
                While my solution may not have been a first-place solution that "every biologist and biotechnologist in the world" will use it,
                I still think my solution was pretty good for my first Kaggle competition. Better yet, I learned a ton
                from this competition:
            </p>
            <li>I went from knowing very basic TensorFlow to making custom modules in PyTorch.</li>
            <li>I learned a whole bunch of niche biology that was super interesting and that I may never use again😂</li>
            <li>I learned how to use a bunch of tools in the ML ecosystem</li>
        </div>
        <HeadedContainer className="pb-2" textSize="text-xl" title="Intro and Data Preprocessing Steps">
            <p className="pb-2">
                I first got dragged into the competition when I met a couple members of SJSU's ML club who
                were competing. They were trying to do a codon-based approach: separate an RNA strand into
                codons (special RNA sequences of length 3) and then predict the structure of the overall molecule
                based on those codons. It took me a couple days to get caught up with all the biology and code
                that I needed to know, but once I did, I messed around a bit with the data preprocessing pipeline
                to filter out bad data points (sequences where the signal to noise ratio was too high). Surprisingly,
                this led to a pretty significant improvement on our mean average error (MAE) (how far off our predictions
                of the RNA sequence's shape were on average), dropping it by .06 (a 20% improvement) to <b>.27443</b>
            </p>
        </HeadedContainer>
        <HeadedContainer className="pb-2" textSize="text-xl" title="Transformer Modeling">
            <p>
                Next up, I started looking at the actual model. The model my team was using at the time was a standard
                Sequential Keras model comprised of Dense layers. Surely we could do better. So, I started by making a
                CNN version of the model. A slight improvement, but not significant. This was probably because CNNs require
                either a lot of sequential layers or an extremely large kernel size in order to capture long-range dependencies,
                which I'm sure RNA sequences are full of. So, I tried out using a transformer as my architecture. I wrote up
                a transformer almost identical to the BERT paper, but with a few changes. Instead of embedding words, I
                just one-hot encoded the RNA bases (A,C,U,G) and then used a Linear (PyTorch's Dense) layer to project the one-hot vector
                to my embedding dimension. The other major change was to have the output be a continous output. Instead of using a
                softmax function to get the maximum probability of a word, I would use another Linear layer to project the
                embedding dimension down to a scalar. This led to a huge improvement again, and we dropped to <b>.22289</b>
            </p>
        </HeadedContainer>
        <HeadedContainer className="pb-2" textSize="text-xl" title="BPPs and Optimizations">
            <p>
                The last major change I made was adding the base-pair probability matrix as another input to the model.
                The base-pair probability matrix, or BPP matrix, is the probability that a given nucleotide will pair
                with another nucleotide in the sequence. There are already libraries and algorithms to calculate BPP
                matrices, so I started by using the EternaFold library. This showed a slight improvement, so I added
                several BPP libraries to our preprocessing pipeline. In the end, this dropped us down to <b>.16429</b>. After that,
                I focused on optimizing training and preprocessing code, mostly focusing on how to use my school's distributed
                Slurm cluster, how to run preprocessing on more CPU cores, and how to upload datasets
                (and more importantly, my preprocessed datasets) to HuggingFace. Because of those little optimizations, I
                was able to fit in a bit more training before the competition ended, ending up at <b>.15642</b>.
            </p>
        </HeadedContainer>

        <HeadedContainer title="The end" textSize="text-xl" className="pb-2">
            <p className="pb-2">
                In the end, I ended up winning a silver medal for my approach 🥳🎉. It's not bad, but it could've been better.
                If I do any more Kaggle competitions, I'll be sure to not keep throwing data
                at the model when that data doesn't lead to improvements. That was something that really slowed me down in this
                competition since I poured a lot of time into preprocessing data that really wasn't necessary. Instead, if I ever
                do another competition like this, I'll look more into other ways to use data that I already have.
            </p>
            <div className="flex w-full flex-wrap items-center justify-center">
                <Image src="/kaggle_silver.png" width={744} height={410} className="w-full lg:w-[66.6%]" alt="silver place" />
                <p className="italic text-sm">Screenshot of the email I received telling me I won a silver medal.</p>
            </div>
        </HeadedContainer>

        <SkillsUsed>
            <Skill name="Python" img="/python.svg" brief="With almost every data science tool being written in C++ and then compiled for Python, what better language to use is there?" />
            <Skill name="TensorFlow" img="/tf.svg">
                <p ><i>Initial prototyping was done with TensorFlow due to the amazing power of TensorFlow Keras Layers and </i><code>model.fit</code></p>
            </Skill>
            <Skill name="PyTorch" img="/pt.svg" brief="PyTorch was the framework I ended up using in the end, and it provided a lot of the flexibility that I needed for the project, especially since many of the libraries I used, like xFormers (for memory-efficient attention) and HuggingFace use PyTorch." />
        </SkillsUsed>
    </Blog>
}