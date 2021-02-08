import React, {Component} from "react";
import {Row, Column} from "../Grid";
import {Title} from "./Title";

export class SearchResults extends Component{
    constructor(props){
        super(props);
    };
    render(){
        return(
            <Row>
                <Column size="md-2"/>
                <Column size="md-8">
                    <Title><h1>Search Results</h1></Title>
                    {this.props.children}
                </Column>
            </Row>
        );
    };
};