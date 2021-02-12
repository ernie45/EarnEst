import React, { Component } from "react";
import { Row, Column } from "../components/Grid";
import { Title, InputSearch, Button, SearchResults } from "../components/Form";
import { List, Item } from "../components/List";
import API from "../utils/API";

/** This page/class as a component will handle the search and save of a stock */
export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /** Comes from Input response that the user types in */
            inputTicker: "",
            returnedTicker: "",
            lastPrice: "",
            /** Check if a search has been performed */
            isTickerSearched: false

            /**props.savedTickers */
            /**props.inWatchlist */
            /**props.checkIfInWatchlist() */
            /**props.handleSavingToWatchlist() */
            /**props.handleRemovingFromWatchlist() */
        }
    }
    /** Change state variables as they're being typed in */
    /** This function is event based; onChange */
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            /** Superimpose the value of the target onto the name of the target */
            /** This is a general form that allows for a variable name */
            /** In order to change state of variable names */
            [name]: value
        });
    };
    /** This function will be called by the search button */
    handleSearching = event => {
        event.preventDefault();
        /** Call the api to search a specific stock*/
        API.searchSpecificTicker(this.state.inputTicker).then(data => {
            if (data.data) {
                this.setState({
                    returnedTicker: data.data.symbol,
                    lastPrice: data.data.regularMarketLastPrice,
                    /** Let the app know a ticker has been searched */
                    /** Only if data was retreived on a specific stock */
                    isTickerSearched: true
                })
                this.props.checkIfInWatchlist(data.data.symbol);
            }
        });
    };
    render() {
        return (
            <div>

                {/* INPUT FOR TICKER SYMBOL */}

                <Row>
                    <Column size="xs-2 md-5"></Column>
                    <Column className="text-center" size="xs-8 md-2">
                        <InputSearch
                            heading="Search Here"
                            value={this.state.inputTicker}
                            onChange={(event) => this.handleInputChange(event)}
                            name="inputTicker"
                            searchFunctionality={this.handleSearching}
                        />
                    </Column>
                    <Column size="xs-2"></Column>
                </Row>

                {/** SEARCH RESULTS AREA */}

                <Row>
                    <Column size="xs-2"></Column>
                    <Column className="text-center" size="xs-8">
                        <SearchResults>

                            {/** Check if a ticker has been searched 
                             * If not, render empty elements*/}
                            {this.state.isTickerSearched ? (
                                <div>
                                    <Column size="xs-1"></Column>
                                    <Column size="xs-10"></Column>
                                    <Row>

                                        {/** TICKER SYMBOL */}

                                        <Column size="xs-4">
                                            {this.state.returnedTicker}
                                        </Column>

                                        {/** LAST PRICE */}
                                        <Column size="xs-4">
                                            {this.state.lastPrice}
                                        </Column>

                                        {/** BUTTON TO ADD/SUB TO WATCHLIST */}

                                        <Column size="xs-4">
                                            {/** If the stock doesn't exist in the watclist */}
                                            {/** Display the save to watchlist option */}
                                            {/** If it does exist, display the remove option */}
                                            {!this.props.inWatchlist ? (

                                                <Button
                                                    name={this.state.returnedTicker}
                                                    onClick={(event) => { this.props.handleSavingToWatchlist(event, this.state.returnedTicker) }}
                                                >
                                                    + Watchlist
                                                </Button>
                                            ) : (
                                                    <Button
                                                        name={this.state.returnedTicker}
                                                        onClick={this.props.handleRemovingFromWatchlist}
                                                    >
                                                        - Watchlist
                                                    </Button>
                                                )}
                                        </Column>
                                    </Row>
                                    <Column size="xs-1"></Column>
                                </div>
                            ) : (<div></div>)}
                        </SearchResults>
                    </Column>
                    <Column size="xs-2"></Column>
                </Row>
            </div>
        );
    };
};