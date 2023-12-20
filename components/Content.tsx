import React from "react";
import { NavbarDefault } from "./NavBar";

export interface ContentProps extends React.PropsWithChildren {
    pre?(): React.JSX.Element
}

export const Content: React.FunctionComponent<ContentProps> = props => {
    return <main className="h-screen bg-white dark:bg-black">
        <NavbarDefault />
        {props.pre ? props.pre() : null}
        <div className="mx-[16.6%]">
            {props.children}
        </div>
    </main>
}
