import React from "react";
import { NavbarDefault } from "./NavBar";
import { Footer } from "./Footer";

export interface ContentProps extends React.PropsWithChildren {
    pre?(): React.JSX.Element
}

export const Content: React.FunctionComponent<ContentProps> = props => {
    return <main className="h-max bg-white dark:bg-black relative ">
        <NavbarDefault />
        {props.pre ? props.pre() : null}
        <div className="mx-[16.6%] pb-8">
            {props.children}
        </div>
        <Footer />
    </main>
}
