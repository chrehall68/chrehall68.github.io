"use server";
import { NeetCode_ } from "@/interfaces/NeetCode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _req: NextRequest,
) {
    console.log("request received");
    const submissions = await NeetCode_.update();

    // convert from map to boolean[][]
    let nc_submissions: boolean[][] = [];
    Array.from(submissions.keys()).forEach(topic => {
        let statuses: boolean[] = [];
        submissions.get(topic)?.forEach(status => statuses.push(status));
        nc_submissions.push(statuses);
    })

    // convert from map to string[][]
    let problems: string[][] = [];
    Array.from(NeetCode_.problemMap.keys()).forEach(topic => {
        let problems_: string[] = [];
        NeetCode_.problemMap.get(topic)?.forEach(problem => problems_.push(problem));
        problems.push(problems_);
    })

    // assemble the serializable ret
    const nc = { solvedProblems: nc_submissions, topics: NeetCode_.topics, problems: problems }
    const ret = NextResponse.json(nc, { status: 200 });
    return ret;
}