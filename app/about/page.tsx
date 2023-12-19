import { NavBar } from "@/components/NavBar";

export default function About() {
    return <main className="h-screen overflow-y-scroll overflow-x-hidden">
        {NavBar()}
        <h1>About Me</h1>
        <p>This is a super detailed description of me. Wooh! I love details! Ideally there would
            be several paragraphs, each with an accompanying image in a style something like below:
        </p>
        <p>Text Thing BREAK Thing Text BREAK Text Thing</p>
    </main>
}