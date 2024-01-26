import { Blog, Skill, SkillsUsed } from "@/components/Blog";
import { HeadedContainer } from "@/components/HeadedContainer";
import Link from "next/link";

export default function Page() {
    return <Blog title="JavaBench" dates="January 2024" brief="Classic Data Structures and Algorithsm implemented and benchmarked in Java." github="https://github.com/chrehall68/javabench">
        <p className="pb-2">
            This was my chance to implement a bunch of data structures and algorithms in Java.
            The choice of Java was simple: SJSU requires CS majors to take all their classes in Java,
            meaning that there are strict Java prerequisites. Thus, this project was my way to brush
            up on my DSA skills while getting better at Java.
        </p>

        <HeadedContainer title="Sorting Algorithms" textSize="text-xl">
            <div className="pb-2">
                <p>
                    I started off by just implementing the following sorting algorithms:
                </p>
                <li><code>O(n^2)</code></li>
                <li className="pl-8">Shellsort (technically, it could be faster, but it still has O(n^2) worst case)</li>
                <li><code>O(nlogn)</code></li>
                <li className="pl-8">Mergesort</li>
                <li className="pl-8">Quicksort</li>
                <li><code>O(nk)</code></li>
                <li className="pl-8">Radixsort</li>
            </div>

            <p className="pb-2">
                The best part of implementing these sorting algorithms was coming up with unique ways to optimize them.
                This especially applied to Radix, where the buckets lend themselves to optimization. After doing some
                experimentation and benchmarking, I found that I could get extremely good performance if I just allocated
                <code>c</code> arrays of size n for my buckets, where c was <code>base+1</code>. While this resulted in <code>O(nc)</code>
                extra memory usage, it was extremely fast. However, since that&apos;s a lot of memory, I also implemented a more
                memory efficient version that used linked lists as the buckets (at the cost of being a constant factor slower
                than the primitive arrays). This really hammered in the fact in that you can save runtime or memory, but not both.
            </p>
        </HeadedContainer>

        <HeadedContainer title="Heaps" textSize="text-xl">
            <p className="pb-2">
                As for heaps, I started by implemented the standard binary heap, but then I wanted to learn a bit more.
                So, I took this as the chance to learn about the binomial heap.
            </p>
            <p className="pb-2">
                Learning about the binomial heap was truly an <i>interesting</i> experience. I have to say, the fact that
                the heap doesn&apos;t have a root node and is just made up of a list of trees really was a shock. Moreover,
                after wrapping my head around that, I had a <i>really fun time</i> figuring out why binomial heaps worked.
                Eventually, I managed to understand the merge process (which is used for basically every operation on a binomial heap),
                but not without a lot of reading on the Geeks for Geeks page and a lot of paper used up for diagrams.
            </p>
            <p className="pb-2">
                It&apos;s somewhat funny that after all that work, the binomial heap that I implemented proved to be slower than the
                binary heap. That&apos;s probably due in part to my implementation of it, but I think it also has to do with the fact
                that my binary heap was built on a primitive array (which has great access times and optimizations such as prefetching)
                while the binomial heap is made up of a bunch of nodes scattered about in memory and only linked together by pointers.
                Still, implementing the binomial heap was a cool learning experience.
            </p>
        </HeadedContainer>

        <HeadedContainer title="Maps" textSize="text-xl">
            <p className="pb-2">
                For maps, I implemented the standard AVL Tree and a separately chained Hash Map. In the future, I may implement
                an open-addressed HashMap (inspired by <Link href="https://thenumb.at/Hashtables/" className="underline">this amazing article</Link>).
                For now, though, a separately chained HashMap is all I have.
            </p>
            <p className="pb-2">
                I must say, I was really surprised at the difference in performance between an AVL tree and a HashMap. I never realized
                <code>O(logn)</code> was so much slower than <code>O(1)</code> until I ran my benchmarks and
                saw the difference in millisecond times (in the order of several magnitudes!) for retrievals and additions in my AVL tree
                versus my HashMap. Because of that, I really appreciate the value of a good HashMap.
            </p>
        </HeadedContainer>

        <SkillsUsed>
            <Skill name="Java" img="/java.svg" brief="What other language would I use? Java may not be the fastest language, but it sure has a versatile Collections framework that allowed me to write very clean code." />
        </SkillsUsed>
    </Blog>
}