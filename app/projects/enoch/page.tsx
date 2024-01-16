import { Blog, Skill, SkillsUsed } from "@/components/Blog";
import { HeadedContainer } from "@/components/HeadedContainer";

export default function Page() {
    return <Blog title="Enoch" dates="March 2020 - May 2023"
        brief="Saving volunteers 8+ hours a week by automating the student/class scheduling process"
    >
        <p className="pb-2">
            When I was still in high school, I volunteered at Code 4 Tomorrow.
            We were an organization of student volunteers dedicated to giving children in
            underpriveleged communities the opportunity to learn to code.
            I started as just a teacher, but soon I realized that I could put my design and coding
            skills to better use by optimizing the organization. That&apos;s how Enoch came to be.
        </p>
        <HeadedContainer title="Inception" textSize="text-xl">
            <p className="pb-2">
                The actual story of how Enoch came to be is a bit more complex than that.
                The organization&apos;s president had the idea to make an application to automate
                class scheduling. I just happened to be the one who built the application itself.
            </p>
        </HeadedContainer>
        <HeadedContainer title="Outlining the Problem" textSize="text-xl">
            <p className="pb-2">
                As it was, we had our whole HR department working on it, and
                even then they were still falling behind. I don&apos;t blame them; class scheduling
                was a complicated process involving coordinating teacher availabilities, student
                preferences, and more.
            </p>
            <p className="pb-2">
                To solve this problem, I turned to the people that were working on it. I asked many
                members in the HR department about the system that they were using, about what they
                considered when scheduling classes and pairing students with teachers, and about
                hundreds of other details. Soon, I had a pretty clear picture of what was going on
                and how an application could benefit them.
            </p>
        </HeadedContainer>
        <HeadedContainer title="The Solution" textSize="text-xl">
            <p className="pb-2">
                From there, the solution was pretty straightforward. I created an algorithm
                base on the HR department&apos;s processes, and I used the Google Sheets API
                to integrate that algorithm with the HR department&apos;s existing class
                scheduling sheets. Problem solved! 🎉
            </p>
            <p className="pb-2">
                After that, the backbone of Enoch was done. Sure, there were incremental changes
                that we could make, and there was certainly a lot of code refactoring that could&apos;ve
                been done. But the main application was working. That&apos;s what mattered.
            </p>
            <p className="pb-2">
                In the months that followed, I, the new Enoch Project Manager, recruited a team
                of several other high school students, introduced them to our codebase, and together
                we maintained and improved Enoch. As the PM, I created tasks for each sprint and held weekly
                standups to measure our burndown (fancy Agile term for the rate of progress) on those tasks.
            </p>
        </HeadedContainer>

        <SkillsUsed>
            <Skill name="Heroku" brief="My team and I used Heroku to host our application" img="/heroku.svg" />
        </SkillsUsed>

    </Blog>
}