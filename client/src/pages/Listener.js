import React, { Component } from "react";
import { Featured } from "./Featured";

export class Listener extends Component {
    constructor(props) {
        super(props);
        this.state = {


            //props.savedTickers
            //props.checkIfInWatchlist
            //props.inWatchlist
            //props.handleSavingToWatchlist
            //props.handleRemovingFromWatchlist
        };
    };
    render() {
        return (
            <Featured
                savedTickers={this.props.savedTickers}
                checkIfInWatchlist={this.props.checkIfInWatchlist}
                inWatchlist={this.props.inWatchlist}
                handleSavingToWatchlist={this.props.handleSavingToWatchlist}
                handleRemovingFromWatchlist={this.props.handleRemovingFromWatchlist}
            />
        )
    };
}