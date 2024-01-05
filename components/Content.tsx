"use client";
import React from "react";
import { NavbarDefault } from "./NavBar";
import { Footer } from "./Footer";
import { FadeOutLoading } from "./Loading";

export interface ContentProps extends React.PropsWithChildren {
    pre?(): React.JSX.Element,
    useLoader?: boolean
}

export const Content: React.FunctionComponent<ContentProps> = props => {
    return <main className="h-max bg-white dark:bg-black static w-full">
        {props.useLoader ? <FadeOutLoading /> : null}
        <div className="relative w-full h-max overflow-x-hidden">
            <NavbarDefault />
            {props.pre ? props.pre() : null}
            <div className="mx-[5%] lg:mx-[16.6%] pb-8">
                {props.children}
            </div>
            <Footer />
        </div>
    </main>
}
