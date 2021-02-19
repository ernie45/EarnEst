import React, { Component } from "react";
import { Row, Column } from "../components/Grid";
import API from "../utils/API";
import { List, Item } from "../components/List";
import { Button } from "../components/Form";

export class Watchlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: [],
            showMore: false,
            clickedOn: ""
            /**props.savedTickers */
            /**props.handleRemovingFromWatchlist */
            /**props.handleSavingToWatchlist */
            /**props.stockPriceArr */
        };
    };
    /** Pull in saved articles as soon as the page loads */
    componentDidMount = () => { };
    showMore = ticker => {
        console.log(`Show more of: ${ticker}`);
        if (!this.state.showMore) {
            this.setState({
                showMore: true,
                clickedOn: ticker
            });
        }
        else {
            if (this.state.clickedOn !== ticker){
                this.setState({
                    clickedOn: ticker
                });
            }
            else{
                this.setState({
                    showMore: false,
                    clickOn: ""
                });
            }
        }
    }
    render() {
        return (
            <Row>
                <Column size="xs-2"></Column>
                <Column size="xs-8">
                    {this.props.savedTickers.length ? (
                        <List>
                            {this.props.savedTickers.map(tick => {
                                return (
                                    <Item key={tick._id}>
                                        {this.props.stockPriceArr.filter(data => {
                                            return (data.ticker === tick.name);
                                        }).map(stock => {
                                            return <div><Row onClick={() => this.showMore(tick.name)}>
                                                <Column size="xs-4">{tick.name}</Column>
                                                <Column size="xs-4">

                                                    <Row>
                                                        <Column size="xs-12">
                                                            {stock.lastPrice}
                                                        </Column>
                                                    </Row>
                                                </Column>
                                                <Column size="xs-4">
                                                    <Button
                                                        name={tick.name}
                                                        onClick={this.props.handleRemovingFromWatchlist}
                                                    >
                                                        --
                                                </Button>
                                                </Column>
                                            </Row>
                                                <Row>
                                                    {this.state.showMore ? (
                                                        <Row>
                                                            {this.state.clickedOn === tick.name ? (
                                                                <Column size="xs-6">
                                                                    {stock.lastPrice}
                                                                </Column>
                                                            ) : (<div></div>)}
                                                        </Row>
                                                    ) : (<div></div>)}
                                                </Row>
                                            </div>
                                        })}
                                    </Item>
                                )
                            })}
                        </List>
                    ) : (<h1>Nothing to display</h1>)}
                </Column>
                <Column size="xs-2"></Column>
            </Row>
        )
    };
};