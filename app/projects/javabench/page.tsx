import { Blog, Skill, SkillsUsed } from "@/components/Blog";

export default function Page() {
    return <Blog title="JavaBench" dates="January 2024" brief="Classic Data Structures and Algorithsm implemented and benchmarked in Java." github="https://github.com/chrehall68/javabench">
        <p className="pb-2">
            This was my chance to implement a bunch of data structures and algorithms in Java. More on this later.
        </p>

        <SkillsUsed>
            <Skill name="Java" img="/java.svg" brief="Java is so amazing!!!!!!! I love java! Because of Java, when I look at the world, I see objects. Everywhere I look, even in nature, I see Java objects." />
        </SkillsUsed>
    </Blog>
}