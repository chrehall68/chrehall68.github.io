import { NeetCode } from "./neetcode";
import { ClientLeetCodePage } from "./client";

export default function Page() {
    return <ClientLeetCodePage>
        <NeetCode></NeetCode>
    </ClientLeetCodePage>
}