import React from "react";
/** Create a container for the Main Page */
/** Export container as a variable */
export const Container = ({fluid, children}) =>
    /** If fluid is true, tack on -fluid, else, don't */
    <div className={`container${fluid ? "-fluid": ""}`}>
        {children}
    </div>