import React, {Component} from "react";
import {Row, Column} from "../components/Grid";
import {Title, Input, Button, SearchResults} from "../components/Form";
import {List, Item} from "../components/List";
import API from "../utils/API";

export class Search extends Component{
    constructor(props){
        super(props);
        this.state ={
            /** Comes from Input response */
            currentTicker: "",
            lastPrice: "",
            /** Check if a search has been performed */
            specificTickerSearched: false
        }
    }
    /** Change state variables as they're being typed in */
    /** This function is event based; onChange */
    handleInputChange = event =>{
        const {name, value} = event.target;
        this.setState({
            /** Superimpose the value of the target onto the name of the target */
            /** This is a general form that allows for a variable name */
            /** In order to change state of variable names */
            [name]: value
        });
    };
    /** This function will be called by the search button */
    handleSearching = event =>{
        event.preventDefault();
        /** Call the api to search a specific stock*/
        API.searchSpecificTicker(this.state.currentTicker).then(data => {
            this.setState({
                currentTicker: data.data.symbol,
                lastPrice: data.data.regularMarketLastPrice,
                /** Let the app know a ticker has been searched */
                specificTickerSearched: true
            })
        });
    };
    /** This function will be called by the add to watchlist button */
    handleSavingToWatchlist = event =>{
        event.preventDefault(); 
        /** Call the api to route */
        API.saveTicker(this.state.currentTicker)
    };
    render(){
        return(
            <div>

     {/* PAGE TITLE */}

                <Row>
                    <Column size="sm-5"></Column>
                    <Column className="text-center" size="sm-2">
                       <Title>
                           <h1 className="text-center">
                               Earn Nest
                           </h1>
                       </Title>
                    </Column>
                    <Column size="sm-5"></Column>
                </Row>

    {/* INPUT FOR TICKER SYMBOL */}

                <Row>
                    <Column size="sm-5"></Column>
                    <Column className="text-center" size="sm-2">
                        <Input
                            heading="Search Here"
                            value={this.state.currentTicker}
                            onChange={this.handleInputChange}
                            name="currentTicker"
                        />
                    </Column>
                    <Column size="sm-5"></Column>
                </Row>

    {/** SEARCH BUTTON */}

                <Row>
                    <Column size="sm-5"></Column>
                    <Column className="text-center" size="sm-2">
                        <Button onClick={this.handleSearching}>
                            Search
                        </Button>
                    </Column>
                    <Column size="sm-5"></Column>
                </Row>

    {/** SEARCH RESULTS AREA */}

                <Row>
                    <Column size="sm-4"></Column>
                    <Column className="text-center" size="sm-4">
                        <SearchResults>

                            {/** Check if a ticker has been searched 
                             * If not, render empty elements*/}
                            {this.state.specificTickerSearched ?  (
                                <div>

                            {/** TICKER SYMBOL */}

                                    <Column size="sm-4">
                                        {this.state.currentTicker}
                                    </Column>

                            {/** LAST PRICE */}
                                    <Column size="sm-4">
                                        {this.state.lastPrice}
                                    </Column>

                            {/** BUTTON TO ADD TO WATCHLIST */}

                                    <Column size="sm-4">
                                        <Button
                                            onClick={this.handleSavingToWatchlist}
                                        >
                                            + Watchlist
                                        </Button>
                                    </Column>
                                </div>
                            ) : (<div></div>)}
                        </SearchResults>
                    </Column>
                    <Column size="sm-4"></Column>
                </Row>
            </div>
        );
    };
};