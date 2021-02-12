import React, { Component } from "react";
import { Featured } from "./Featured";
import { Search } from "./Search";
import { Watchlist } from "./Watchlist";
import { Tab } from "../components/Navpills";
import { Row, Column } from "../components/Grid";
import { Title } from "../components/Form";
import { Item } from "../components/List";
import API from "../utils/API";

class MainPage extends Component {
    /** Define the state of the page */
    state = {
        currentPage: "Search",
        test: "test",
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
    /** Change the tab to the page passsed in */
    handlePageChange = page => {
        /** Change the currentPage state to the props passed in */
        /** This page will become active */
        this.setState({
            currentPage: page
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
            this.setState({savedTickers: data.data});
        });
    };
    renderPage = () => {
        if (this.state.currentPage === "Featured") {
            return <Featured
                currentPage={this.state.currentPage}
            />
        }
        else if (this.state.currentPage === "Search") {
            return <Search
                checkIfInWatchlist={this.checkIfInWatchlist}
                inWatchlist={this.state.inWatchlist}
                handleSavingToWatchlist={this.handleSavingToWatchlist}
                handleRemovingFromWatchlist={this.handleRemovingFromWatchlist}
            />
        }
        else if (this.state.currentPage === "Watchlist") {
            return <Watchlist
                savedTickers={this.state.savedTickers}
                checkIfInWatchlist={this.checkIfInWatchlist}
                inWatchlist={this.state.inWatchlist}
                handleSavingToWatchlist={this.handleSavingToWatchlist}
                handleRemovingFromWatchlist={this.handleRemovingFromWatchlist}
            />
        }
    };
    render() {
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
                                <a>Home</a>
                            </li>
                            <li onClick={() => this.handlePageChange("Watchlist")}>
                                <a>Watchlist</a>
                            </li>
                        </Tab>
                    </Column>
                </Row>
                {this.renderPage()}
            </div>
        )
    };
};

export default MainPage;