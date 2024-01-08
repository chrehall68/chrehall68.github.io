import { NextRequest, NextResponse } from "next/server";
import LeetCode, { Credential, RateLimiter } from "leetcode-query";

// allow new requests every 20 seconds (20 is an arbitrary number)
export const revalidate = 20;

class NeetCode_ {
    static topics: string[] = [
        "Arrays & Hashing",
        "Two Pointers",
        "Sliding Window",
        "Stack",
        "Binary Search",
        "Linked List",
        "Trees",
        "Tries",
        "Heap/Priority Queue",
        "Backtracking",
        "Graphs",
        "Advanced Graphs",
        "1D DP",
        "2D DP",
        "Greedy",
        "Intervals",
        "Math & Geometry",
        "Bit Manipulation"
    ]
    static problemMap = new Map<string, string[]>([
        ["Arrays & Hashing", ["Contains Duplicate", "Valid Anagram", "Two Sum", "Group Anagrams", "Top K Frequent Elements", "Product of Array Except Self", "Valid Sudoku", "Encode and Decode Strings", "Longest Consecutive Sequence"]],
        ["Two Pointers", ["Valid Palindrome", "Two Sum II Input Array Is Sorted", "3Sum", "Container With Most Water", "Trapping Rain Water"]],
        ["Sliding Window", ["Best Time to Buy And Sell Stock", "Longest Substring Without Repeating Characters", "Longest Repeating Character Replacement", "Permutation In String", "Minimum Window Substring", "Sliding Window Maximum"]],
        ["Stack", ["Valid Parentheses", "Min Stack", "Evaluate Reverse Polish Notation", "Generate Parentheses", "Daily Temperatures", "Car Fleet", "Largest Rectangle In Histogram"]],
        ["Binary Search", ["Binary Search", "Search a 2D Matrix", "Koko Eating Bananas", "Find Minimum In Rotated Sorted Array", "Search in Rotated Sorted Array", "Time Based Key Value Store", "Median of Two Sorted Arrays"]],
        ["Linked List", ["Reverse Linked List", "Merge Two Sorted Lists", "Reorder List", "remove Nth Node From End of List", "Copy List With Random Pointer", "Add Two Numbers", "Linked List Cycle", "Find The Duplicate Number", "LRU Cache", "Merge K Sorted Lists", "Reverse Nodes in K Group"]],
        ["Trees", ["Invert Binary Tree", "Maximum Depth of Binary Tree", "Diameter of Binary Tree", "Balanced Binary Tree", "Same Tree", "Subtree of Another Tree", "Lowest Common Ancestor of a Binary Search Tree", "Binary Tree Level Order Traversal", "Binary Tree Right Side View", "Count Good Nodes in Binary Tree", "Validate Binary Search Tree", "Kth Smallest Element in a Bst", "Construct Binary Tree From Preorder And Inorder Traversal", "Binary Tree Maximum Path Sum", "Serialize and Deserialize Binary Tree"]],
        ["Tries", ["Implement Trie Prefix Tree", "Design Add And Search Words Data Structure", "Word Search II"]],
        ["Heap/Priority Queue", ["Kth Largest Element In a Stream", "Last Stone Weight", "K Closest Points to Origin", "Kth Largest Element In An Array", "Task Scheduler", "Design Twitter", "Find Median From Data Stream"]],
        ["Backtracking", ["Subsets", "Combination Sum", "Permutations", "Subsets II", "Combination Sum II", "Word Search", "Palindrome Partitioning", "Letter Combinations of a Phone Number", "N Queens"]],
        ["Graphs", ["Number of Islands", "Clone Graph", "Max Area of Island", "Pacific Atlantic Water Flow", "Surrounded Regions", "Rotting Oranges", "Walls And Gates", "Course Schedule", "Course Schedule II", "Redundant Connection", "Number of Connected Components In An Undirected Graph", "Graph Valid Tree", "Word Ladder"]],
        ["Advanced Graphs", ["Reconstruct Itinerary", "Min Cost to Connect All Points", "Network Delay Time", "Swim In Rising Water", "Alien Dictionary", "Cheapest Flights Within K Stops"]],
        ["1D DP", ["Climbing Stairs", "Min Cost Climbing Stairs", "House Robber", "House Robber II", "Longest Palindromic Substring", "Palindromic Substrings", "Decode Ways", "Coin Change", "Maximum Product Subarray", "Word Break", "Longest Increasing Subsequence", "Partition Equal Subset Sum"]],
        ["2D DP", ["Unique Paths", "Longest Common Subsequence", "Best Time to Buy And Sell Stock With Cooldown", "Coin Change II", "Target Sum", "Interleaving String", "Longest Increasing Path In a Matrix", "Distinct Subsequences", "Edit Distance", "Burst Balloons", "Regular Expression Matching"]],
        ["Greedy", ["Maximum Subarray", "Jump Game", "Jump Game II", "Gas Station", "Hand of Straights", "Merge Triplets to Form Target Triplet", "Partition Labels", "Valid Parenthesis String"]],
        ["Intervals", ["Insert Interval", "Merge Intervals", "Non Overlapping Intervals", "Meeting Rooms", "Meeting Rooms II", "Minimum Interval to Include Each Query"]],
        ["Math & Geometry", ["Rotate Image", "Spiral Matrix", "Set Matrix Zeroes", "Happy Number", "Plus One", "Pow(x, n)", "Multiply Strings", "Detect Squares"]],
        ["Bit Manipulation", ["Single Number", "Number of 1 Bits", "Counting Bits", "Reverse Bits", "Missing Number", "Sum of Two Integers", "Reverse Integer"]],
    ])
    static solvedProblems: Map<string, boolean[]> = new Map<string, boolean[]>([
        ["Arrays & Hashing", []],
        ["Two Pointers", []],
        ["Sliding Window", []],
        ["Stack", []],
        ["Binary Search", []],
        ["Linked List", []],
        ["Trees", []],
        ["Tries", []],
        ["Heap/Priority Queue", []],
        ["Backtracking", []],
        ["Graphs", []],
        ["Advanced Graphs", []],
        ["1D DP", []],
        ["2D DP", []],
        ["Greedy", []],
        ["Intervals", []],
        ["Math & Geometry", []],
        ["Bit Manipulation", []],
    ])
    static lastUpdate: number = 0;
    static msBetween: number = 5 * 60 * 1000;  // update values every 5 minutes
    static numLoaded: number = 0;

    static async update() {
        // if we've updated in the required time, don't do anything
        // else, log that we did an update
        if (Date.now() - NeetCode_.lastUpdate < NeetCode_.msBetween) {
            console.log("using cached values since last update was ", new Date(this.lastUpdate).toLocaleTimeString("en-US", { timeZone: "PST" }));
            return this.solvedProblems;
        }
        console.log("updating values...");
        NeetCode_.lastUpdate = Date.now();
        NeetCode_.numLoaded = 0;

        // log in, then update.
        let c = new Credential();
        c = await c.init(process.env.LEETCODE_SESSION);

        let lc = new LeetCode(c);
        lc.limiter = new RateLimiter({ limit: 150, concurrent: 150, interval: 10 });

        // add the requests
        let promises = []
        for (const topic of NeetCode_.topics) {
            // clear past records
            NeetCode_.solvedProblems.set(topic, [])

            // get the problems
            let problems = NeetCode_.problemMap.get(topic) || [];
            for (const problem of problems) {
                promises.push(lc.submissions({ limit: 5, offset: 0, slug: problem.toString().toLowerCase().replaceAll(" ", "-").replaceAll(",", "").replaceAll("(", "").replaceAll(")", "") }));
            }
        };

        // wait for the requests
        let startTime = Date.now();
        let returned = await Promise.all(promises);
        let finishedTime = Date.now();
        console.log("took", (finishedTime - startTime), "ms");

        // use the request results
        let topicIdx = 0;
        let submissionIdx = 0;
        for (const submissions of returned) {
            // get the topic
            const topic = this.topics[topicIdx];

            // get whether it was solved or not
            let solved = false;
            submissions.forEach(submission => solved = solved || (submission.statusDisplay == "Accepted"));
            NeetCode_.solvedProblems.get(topic)?.push(solved);

            // increment our counter
            submissionIdx += 1
            if (submissionIdx >= (NeetCode_.problemMap.get(topic)?.length || 0)) {
                topicIdx += 1;
                submissionIdx = 0;
            }
        }

        return this.solvedProblems;
    }
}

export async function GET(
    _req: NextRequest,
) {
    console.log("received request to /api/neetcode")
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