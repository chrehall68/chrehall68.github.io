"use client";
import React, { useState } from "react";
import { HomeIcon, QuestionMarkCircleIcon, DocumentTextIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export const NavbarDefault: React.FunctionComponent = () => {
    const [openNav, setOpenNav] = useState(false);
    const [atTop, setAtTop] = useState(true)

    React.useEffect(() => {
        let openListener = () => window.innerWidth >= 960 && setOpenNav(false)
        window.addEventListener(
            "resize",
            openListener,
        );
        let scrollListener = () => setAtTop(window.scrollY == 0)
        window.addEventListener(
            "scroll",
            scrollListener,
        );

        return () => { window.removeEventListener("resize", openListener); window.removeEventListener("scroll", scrollListener); }
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <Link href="/" className="flex items-center">
                    <HomeIcon className="h-6 w-6" />
                    Home
                </Link>
            </li>
            <li
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <Link href="/about" className="flex items-center">
                    <QuestionMarkCircleIcon className="h-6 w-6" />
                    About
                </Link>
            </li>
            <li
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <Link href="/projects" className="flex items-center">
                    <DocumentTextIcon className="h-6 w-6" />
                    Projects
                </Link>
            </li>
        </ul>
    );

    return (
        <div className="my-16 lg:my-24">
            <nav className={"fixed top-0 left-0 z-10 w-full flex-inline justify-center shadow-md bg-white backdrop-blur-sm dark:bg-black " + (atTop || openNav ? "bg-opacity-100 rounded-none" : "bg-opacity-80 rounded-b-xl")}>
                <div className="mx-auto max-w-screen-xl px-4 py-4 lg:px-8 lg:py-8 mx-auto flex items-center justify-between text-black dark:text-white">
                    <Link href="/" className="py-1 font-medium">
                        Eliot Hall
                    </Link>
                    <div className="hidden lg:block">{navList}</div>
                    <p
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </p>
                </div>
                <div className={"relative bg-white dark:bg-black text-black dark:text-white "}>
                    {openNav ? navList : null}
                    {atTop}
                </div>
            </nav >
        </div >
    );
}