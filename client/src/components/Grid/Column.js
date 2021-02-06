import React from "react";
/** Export column that takes in size and children */
/** Components are exported as variables */
export const Column = ({size, children}) =>
    <div className={size.split(" ").map(size => `col-${size}`).join(" ")}>
        {children}
    </div>