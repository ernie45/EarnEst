import React from "react";
export const Row = props => 
    <div className = {`row${props.fluid ? "-fluid" : ""}`} {...props}>
        {props.children}
    </div>

