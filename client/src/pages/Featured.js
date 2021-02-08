import React, {Component} from "react";
import {Row} from "../components/Grid";
import {Input, Button, SearchResults} from "../components/Form";
import {Search} from "./Search";

export class Featured extends Component{
    constructor(props){
        super(props);
        this.state={};
    };
    render(){
        return (
            <Search/>
        )
    }
};