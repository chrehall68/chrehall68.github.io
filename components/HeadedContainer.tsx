import React from "react";

interface HeadedContainerProps extends React.PropsWithChildren {
    title: string,
    textSize?: string,
    className?: string,
}

export const HeadedContainer: React.FunctionComponent<HeadedContainerProps> = props => {
    let textSize = props.textSize ? props.textSize : "text-3xl";

    return <div className={props.className ? props.className : ""}>
        <p className={textSize}>{props.title}</p>
        <div className="border border-black dark:border-white mb-2" />
        {props.children}
    </div>
}