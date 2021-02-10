import React, {Component} from "react";
import {Row, Column} from "../components/Grid";
import API from "../utils/API";

export class Watchlist extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    };
    componentDidMount = () => {
        this.handleGettingSavedTickers();
    }; 
    handleGettingSavedTickers = () => {
        API.getSavedTickers().then(data => {
            console.log(data);
        });
    };
    render(){
        return <Row><h1>HELLO HONEY BUNNY</h1></Row>
    };
};