import React, { Component } from "react";
import API from "../utils/API";
import { Featured } from "./Featured";

export class Listener extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: 5,
            daysLeft: "",
            expDate: ""

            //props.savedTickers
            //props.checkIfInWatchlist
            //props.inWatchlist
            //props.handleSavingToWatchlist
            //props.handleRemovingFromWatchlist
        };
    };
    componentDidMount = () => {
        var priceHistArr = [];
        setTimeout(() => {
            for (var i = 0; i < this.props.savedTickers.length; i++) {
                console.log(this.props.savedTickers[i].name)
                this.getPriceHistory(this.props.savedTickers[i].name, priceHistArr);
            }
            console.log(priceHistArr);
        }, 2000);
        /* this.getTodaysDate();
        this.getDaysToExpiration();
        this.getExpirationDate();
        setTimeout(() => {
            console.log(this.state.today);
            console.log(this.state.daysLeft);
            console.log(this.state.expDate);
            console.log(this.props.savedTickers[0].name);
            for (var i = 0; i < this.props.savedTickers.length; i++){
                this.searchOptionsChain(this.props.savedTickers[i].name, this.state.today, this.state.expDate)
            }
        }, 2000) */
    };
    /** Takes a callback function that grabs onto today's date */
    getTodaysDate(callback) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var dateObj = { dd: dd, mm: mm, yyyy: yyyy };
        if (callback) {
            callback(dateObj);
        }
        else {
            this.setState({
                today: (yyyy + "-" + mm + "-" + dd)
            });
            return (yyyy + "-" + mm + "-" + dd);
        }
    };
    /** How many days left to our target expiration */
    getDaysToExpiration() {
        /** Monday is 1, Sunday is 7 */
        var d = new Date();
        var n = d.getDay();
        console.log(n);
        var inWeek = (5 - n);
        var nextWeek = (5 + (7 - n));
        console.log(inWeek);
        console.log(nextWeek);
        /** When it is sunday */
        if (n >= 0 && n <= 3) {
            this.setState({
                daysLeft: inWeek
            });
            return inWeek;
        }
        else {
            this.setState({
                daysLeft: nextWeek
            });
            return nextWeek;
        }
    }
    /** Create an expiration date a week from today */
    getExpirationDate() {
        var expDay;
        var expMonth;
        var expYear;
        this.getTodaysDate(date => {
            expDay = String(parseInt(date.dd) + this.getDaysToExpiration()).padStart(2, "0");
            expMonth = date.mm;
            expYear = date.yyyy;
            /** Accounting for the fact that months and years can change */
            if (date.mm === "09" || date.mm === "04" || date.mm === "06" || date.mm === "11") {
                if (parseInt(expDay) > 30) {
                    expMonth = String(parseInt(date.mm) + 1).padStart(2, "0");
                    expDay = String(parseInt(expDay) - 30).padStart(2, "0");
                }
            }
            else {
                if (parseInt(expDay) > 31) {
                    expMonth = String(parseInt(date.mm) + 1).padStart(2, "0");
                    expDay = String(parseInt(expDay) - 31).padStart(2, "0");
                }
            }
            if (parseInt(expMonth) > 12) {
                expYear = String(parseInt(date.mm) + 1).padStart(2, "0");
                expDay = "01";
            }
        });
        this.setState({
            expDate: (expYear + "-" + expMonth + "-" + expDay)
        });
        return (expYear + "-" + expMonth + "-" + expDay);
    };
    /** Retreive price history for all stocks in our watchlist */
    getPriceHistory(ticker, priceHistArr) {
        API.getPriceHistory(ticker).then(data => {
            priceHistArr.push({
                ticker: data.data.symbol,
                weeklyHigh: data.data.candles[3].high,
                weeklyLow: data.data.candles[3].low
            })
        })
    };
    /** Search api for options pricing */
    searchOptionsChain(ticker, today, expiration) {
        API.searchOptionsChain(ticker.toUpperCase(), today, expiration).then(data => {
            var datArr = Object.entries(data.data.calls);
            console.log(Object.entries(datArr));
            var callsArray = Object.entries(Object.entries(data.data.calls)[0][1]);
            var putsArray = Object.entries(Object.entries(data.data.puts)[0][1]);
        });
    };
    render() {
        return (
            <div>
                <h1>{this.state.today}</h1>
                <Featured
                    savedTickers={this.props.savedTickers}
                    checkIfInWatchlist={this.props.checkIfInWatchlist}
                    inWatchlist={this.props.inWatchlist}
                    handleSavingToWatchlist={this.props.handleSavingToWatchlist}
                    handleRemovingFromWatchlist={this.props.handleRemovingFromWatchlist}
                />
            </div>
        )
    };
}