import React, { Component } from "react";
import { Search } from "./Search";
import { Watchlist } from "./Watchlist";
import { Tab } from "../components/Navpills";
import { Row, Column } from "../components/Grid";
import { Title } from "../components/Form";

export class Featured extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage: "Search"

            //props.savedTickers
            //props.checkIfInWatchlist
            //props.inWatchlist
            //props.handleSavingToWatchlist
            //props.handleRemovingFromWatchlist
            //props.stockPriceArr
        };
    };
    /** Change the tab to the page passsed in */
    handlePageChange = page => {
        /** Change the currentPage state to the props passed in */
        /** This page will become active */
        this.setState({
            currentPage: page
        });
    };
    renderPage = () => {
        if (this.state.currentPage === "Search") {
            return <Search
                checkIfInWatchlist={this.props.checkIfInWatchlist}
                inWatchlist={this.props.inWatchlist}
                handleSavingToWatchlist={this.props.handleSavingToWatchlist}
                handleRemovingFromWatchlist={this.props.handleRemovingFromWatchlist}
                stockPriceArr={this.props.stockPriceArr}
            />
        }
        else if (this.state.currentPage === "Watchlist") {
            return <Watchlist
                savedTickers={this.props.savedTickers}
                checkIfInWatchlist={this.props.checkIfInWatchlist}
                inWatchlist={this.props.inWatchlist}
                handleSavingToWatchlist={this.props.handleSavingToWatchlist}
                handleRemovingFromWatchlist={this.props.handleRemovingFromWatchlist}
                stockPriceArr={this.props.stockPriceArr}
            />
        }
    };
    render(){
        return (
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

                <Row>
                    <Column size="xs-6" />
                    <Column size="xs-6">
                        <Tab>
                            <li onClick={() => this.handlePageChange("Search")}>
                                <a>Search</a>
                            </li>
                            <li onClick={() => this.handlePageChange("Watchlist")}>
                                <a>Nest</a>
                            </li>
                        </Tab>
                    </Column>
                </Row>
                {this.renderPage()}
            </div>
        )
    }
};