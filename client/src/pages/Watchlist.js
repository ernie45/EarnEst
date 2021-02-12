import React, {Component} from "react";
import {Row, Column} from "../components/Grid";
import API from "../utils/API";
import {List, Item} from "../components/List";
import {Button} from "../components/Form";

export class Watchlist extends Component{
    constructor(props){
        super(props);
        this.state = {
            /**props.savedTickers */
            /**props.handleRemovingFromWatchlist */
            /**props.handleSavingToWatchlist */
        };
    };
    /** Pull in saved articles as soon as the page loads */
    componentDidMount = () => {}; 
    render(){
        return (
            <Row>
                <Column size="xs-2"></Column>
                <Column size="xs-8>">
                    {this.props.savedTickers.length ? (
                        <List>
                            {this.props.savedTickers.map(tick => {
                                return(
                                    <Item key={tick._id}>
                                        <Row>
                                            <Column size="xs-6">{tick.name}</Column>
                                            <Column size="xs-6">
                                                <Button
                                                    name={tick.name}
                                                    onClick={this.props.handleRemovingFromWatchlist}
                                                >
                                                    - Watchlist
                                                </Button>
                                            </Column>
                                        </Row>
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