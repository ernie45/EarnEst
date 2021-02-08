import React, {Component} from "react";
import {Row, Column} from "../components/Grid";
import {Title, InputSearch, Button, SearchResults} from "../components/Form";
import {List, Item} from "../components/List";
import API from "../utils/API";

/** This page/class as a component will handle the search and save of a stock */
export class Search extends Component{
    constructor(props){
        super(props);
        this.state ={
            /** Comes from Input response that the user types in */
            inputTicker: "",
            lastPrice: "",
            returnedTicker: "",
            /** Check if a search has been performed */
            isTickerSearched: false
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
        API.searchSpecificTicker(this.state.inputTicker).then(data => {
            if (data.data){
                this.setState({
                    returnedTicker: data.data.symbol,
                    lastPrice: data.data.regularMarketLastPrice,
                    /** Let the app know a ticker has been searched */
                    /** Only if data was retreived on a specific stock */
                    isTickerSearched: true
                })
            }
        });
    };
    /** This function will be called by the add to watchlist button */
    handleSavingToWatchlist = event =>{
        event.preventDefault(); 
        /** Call the api to route */
        API.saveTicker(this.state.inputTicker)
    };
    render(){
        return(
            <div>

     {/* PAGE TITLE */}

                <Row>
                    <Column size="md-5"></Column>
                    <Column className="text-center" size="sm-12 md-2">
                       <Title>
                           <h1 className="text-center">
                               Earn Nest
                           </h1>
                       </Title>
                    </Column>
                    <Column size="md-5"></Column>
                </Row>

    {/* INPUT FOR TICKER SYMBOL */}

                <Row>
                    <Column size="xs-2 md-5"></Column>
                    <Column className="text-center" size="xs-8 md-2">
                        <InputSearch
                            heading="Search Here"
                            value={this.state.inputTicker}
                            onChange={this.handleInputChange}
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
                            {this.state.isTickerSearched ?  (
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

                                        {/** BUTTON TO ADD TO WATCHLIST */}

                                            <Column size="xs-4">
                                                <Button
                                                    onClick={this.handleSavingToWatchlist}
                                                >
                                                    + Watchlist
                                                </Button>
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