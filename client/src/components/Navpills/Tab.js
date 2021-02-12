import React from "react";
 
export const Tab = props => 
    <ul class="nav nav-tabs" {...props}>
        {props.children}
    </ul>