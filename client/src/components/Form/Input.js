import React from "react";
/** Export the input as a variable */
export const Input = props =>
    <div>
        <label>{props.heading}</label>
        <input className="form-control" {...props}/>
    </div>