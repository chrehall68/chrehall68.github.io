import Link from "next/link";

export function NavBar() {
    return <div className="flex flex-inline items-center text-center w-full h-[10%] bg-gray-800 border-b border-white">
        <Link href="/" className="p-10">Eliot Hall&apos;s Website</Link>
        <span className="border-white border h-full"></span>
        <Link href="/" className="p-10">Home</Link>
        <span className="border-white border h-full"></span>
        <Link href="/projects" className="p-10">Projects</Link>
        <span className="border-white border h-full"></span>
        <Link href="/about" className="p-10">About</Link>
    </div>
}