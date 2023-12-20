import React from "react";
import {
    Navbar,
    Typography,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import { HomeIcon, QuestionMarkCircleIcon, DocumentTextIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export const NavbarDefault: React.FunctionComponent = () => {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
        return () => window.removeEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <Link href="/" className="flex items-center">
                    <HomeIcon className="h-6 w-6" />
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <Link href="/about" className="flex items-center">
                    <QuestionMarkCircleIcon className="h-6 w-6" />
                    About
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <Link href="/projects" className="flex items-center">
                    <DocumentTextIcon className="h-6 w-6" />
                    Projects
                </Link>
            </Typography>
        </ul>
    );

    return (
        <div className="my-12 lg:m-16">
            <Navbar className="fixed top-0 left-0 w-full flex-inline justify-center shadow-md bg-white dark:bg-black">
                <div className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 mx-auto flex items-center justify-between text-black dark:text-white">
                    <Link href="/" className="py-1 font-medium">
                        Eliot Hall
                    </Link>
                    <div className="hidden lg:block">{navList}</div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </IconButton>
                </div>
                <Collapse open={openNav} className="bg-white dark:bg-black text-black dark:text-white">
                    <div className="container mx-auto">
                        {navList}
                    </div>
                </Collapse>
            </Navbar >
        </div >
    );
}