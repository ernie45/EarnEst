import React, { Component } from "react";
import { Listener } from "./Listener";
import API from "../utils/API";

class Scraper extends Component {
    /** Define the state of the page */
    state = {
        savedTickers: "",
        inWatchlist: false
    };
    /** Upon loading the page */
    componentDidMount = () => {
        this.handleGettingSavedTickers();
    };
    /** This function calls the api to retreive saved tickers from database */
    handleGettingSavedTickers = () => {
        /** After receiving the database tickers */
        API.getSavedTickers().then(data => {
            this.setState({
                savedTickers: data.data
            });
        });
    };
    /** This function reaches into the search page */
    /** It then checks if the ticker searched for */
    /** Exists in the databse already */
    checkIfInWatchlist = ticker => {
        var inBase = false;
        for (var i = 0; i < this.state.savedTickers.length; i++) {
            if (this.state.savedTickers[i].name === ticker) {
                inBase = true;
            }
        }
        this.setState({
            inWatchlist: inBase
        });
    };
    /** This function will be called by the add to watchlist button */
    handleSavingToWatchlist = (event, ticker) => {
        event.preventDefault();
        if (ticker) {
            this.setState({ inWatchlist: true });
            /** Call the api to route */
            API.saveTicker(ticker).then(data => {
                this.setState({ savedTickers: data.data })
            });
        }
    };
    /** When button is pressed delete the ticker */
    handleRemovingFromWatchlist = event => {
        event.preventDefault();
        this.setState({ inWatchlist: false });
        API.removeFromWatchlist(event.target.name).then(data => {
            this.setState({ savedTickers: data.data });
        });
    };
    render() {
        return (
            <Listener
                savedTickers={this.state.savedTickers}
                checkIfInWatchlist={this.checkIfInWatchlist}
                inWatchlist={this.state.inWatchlist}
                handleSavingToWatchlist={this.handleSavingToWatchlist}
                handleRemovingFromWatchlist={this.handleRemovingFromWatchlist}
            />
        )
    };
};

export default Scraper;