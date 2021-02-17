import React, { Component } from "react";
import API from "../utils/API";
import { Featured } from "./Featured";

export class Listener extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: "",
            daysLeft: "",
            expDate: "",
            stockPriceArr: [],
            priceHistArr: []

            //props.savedTickers
            //props.checkIfInWatchlist
            //props.inWatchlist
            //props.handleSavingToWatchlist
            //props.handleRemovingFromWatchlist
        };
    };
    componentDidMount = () => {
        this.getDateInfo();
        setTimeout(() => {
            this.updateNestPrices();
            setTimeout(() => {
                this.getAllPriceHistory();
                setTimeout(() => {
                    this.checkPriceLevels();
                }, 2000);
            }, 2000);
        }, 2000);
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
    /** Get all dates necessary */
    getDateInfo() {
        this.getTodaysDate();
        this.getDaysToExpiration();
        this.getExpirationDate();
    };
    /** Put all the watchlist together to retreive pricing */
    combineTickers() {
        var tickerStr = "";
        if (this.props.savedTickers.length > 1) {
            for (var i = 0; i < this.props.savedTickers.length; i++) {
                tickerStr += `,${this.props.savedTickers[i].name}`;
            }
            return tickerStr;
        }
        else { return this.props.savedTickers[0].name }
    };
    /** Look up current prices for each stock in watchlist */
    updateNestPrices() {
        API.searchStock(this.combineTickers()).then(data => {
            var stockPriceArr = [];
            for (var i = 0; i < this.props.savedTickers.length; i++) {
                var tickObj = data.data[this.props.savedTickers[i].name]
                stockPriceArr.push({
                    ticker: tickObj.symbol,
                    lastPrice: tickObj.lastPrice,
                    volume: tickObj.totalVolume,
                    volatility: tickObj.volatility,
                    netChange: tickObj.netChange,
                    percentChange: tickObj.netPercentChangeInDouble
                });
            }
            stockPriceArr.sort((a, b) => { if (a.ticker > b.ticker) { return 1 } else { return -1 } });
            this.setState({
                stockPriceArr: stockPriceArr
            });
        });
    }
    /** Retreive price history for all stocks in our watchlist */
    getPriceHistory(ticker, priceHistArr) {
        API.getPriceHistory(ticker).then(data => {
            var high;
            if (data.data.candles[3].high > data.data.candles[0].high) {
                high = data.data.candles[3].high;
            }
            else { high = data.data.candles[0].high }
            var targLow;
            if (data.data.candles[3].low < data.data.candles[0].low) {
                targLow = data.data.candles[3].low;
            }
            else { targLow = data.data.candles[0].low }
            priceHistArr.push({
                ticker: data.data.symbol,
                targetHigh: high,
                weeklyLow: data.data.candles[3].low,
                monthlyLow: data.data.candles[0].low,
                targetLow: targLow
            })
            priceHistArr.sort((a, b) => { if (a.ticker > b.ticker) { return 1 } else { return -1 } });
        })
    };
    /** Retreive last weeks lows and highs */
    getAllPriceHistory() {
        var priceHistArr = [];
        for (var i = 0; i < this.props.savedTickers.length; i++) {
            this.getPriceHistory(this.props.savedTickers[i].name, priceHistArr);
        }
        priceHistArr.sort((a, b) => { if (a.ticker > b.ticker) { return 1 } else { return -1 } });
        this.setState({
            priceHistArr: priceHistArr
        });
    };
    /** Chec if we should consider an options trade */
    checkPriceLevels() {
        for (var i = 0; i < this.state.stockPriceArr.length; i++) {
            /** If price is greater than or equal to the weekly high */
            /** Or if the price is just below it */
            if (this.state.stockPriceArr[i].lastPrice >= this.state.priceHistArr[i].targetHigh || Math.abs(this.state.priceHistArr[i].targetHigh - this.state.stockPriceArr[i].lastPrice) <= 3) {
                /** Consider searching options chain */
                this.searchOptionsChain(this.state.stockPriceArr[i].ticker, this.state.today, this.state.expDate, "Calls", this.state.priceHistArr[i].targetHigh, data => {
                    this.findTheVertical(data);
                });
            }
            /** If price is at or below the weekly low */
            /** Or if the price is just above it */
            else if (this.state.stockPriceArr[i].lastPrice <= this.state.priceHistArr[i].targetLow || Math.abs(this.state.stockPriceArr[i].lastPrice - this.state.priceHistArr[i].targetLow) <= 3) {
                /** Consider searching options chain */
                this.searchOptionsChain(this.state.stockPriceArr[i].ticker, this.state.today, this.state.expDate, "Puts", this.state.priceHistArr[i].targetLow, data => {
                    this.findTheVertical(data);
                });
            }
        }
    };
    /** Search api for options pricing */
    searchOptionsChain(ticker, today, expiration, type, extreme, callback) {
        API.searchOptionsChain(ticker, today, expiration).then(data => {
            var opts;
            if (type) {
                if (type === "Calls") {
                    opts = Object.entries(Object.entries(data.data.calls)[0][1]);
                }
                else if (type === "Puts") {
                    opts = Object.entries(Object.entries(data.data.puts)[0][1]);
                }
            }
            if (extreme) {
                this.checkByExtreme(ticker, opts, type, extreme, data => {
                    callback(data);
                });
            }
        });
    };
    /** When looking for options by extrema */
    checkByExtreme(ticker, opts, extremeType, extreme, callback) {
        console.log(ticker);
        console.log(extremeType);
        console.log(extreme);
        var bidAsk = [];
        if (extremeType === "Calls") {
            for (var j = 0; j < opts.length; j++) {
                if (opts[j][0] >= extreme) {
                    var optionInfo = opts[j][1][0];
                    bidAsk.push({
                        ticker: ticker,
                        mainInfo: {
                            type: optionInfo.putCall,
                            strike: optionInfo.strikePrice,
                            bid: optionInfo.bid,
                            ask: optionInfo.ask,
                            expirationDate: optionInfo.expirationDate,
                            inTheMoney: optionInfo.inTheMoney,
                            lastTradingDay: optionInfo.lastTradingDay
                        },
                        tradingHelpers: {
                            openInterest: optionInfo.openInterest,
                            totalVolume: optionInfo.totalVolume,
                            volatility: optionInfo.volatility,
                        },
                        greeks: {
                            delta: optionInfo.delta,
                            theta: optionInfo.theta,
                            vega: optionInfo.vega,
                            gamma: optionInfo.gamma,
                            rho: optionInfo.rho
                        },
                        priceChanges: {
                            lastPrice: optionInfo.last,
                            highPrice: optionInfo.highPrice,
                            lowPrice: optionInfo.lowPrice,
                            percentChange: optionInfo.percentChange,
                            netChange: optionInfo.netChange
                        }
                    });
                }
            }
        }
        else if (extremeType === "Puts") {
            for (var j = 0; j < opts.length; j++) {
                if (opts[j][0] <= extreme) {
                    var optionInfo = opts[j][1][0];
                    bidAsk.push({
                        ticker: ticker,
                        mainInfo: {
                            type: optionInfo.putCall,
                            strike: optionInfo.strikePrice,
                            bid: optionInfo.bid,
                            ask: optionInfo.ask,
                            expirationDate: optionInfo.expirationDate,
                            inTheMoney: optionInfo.inTheMoney,
                            lastTradingDay: optionInfo.lastTradingDay
                        },
                        tradingHelpers: {
                            openInterest: optionInfo.openInterest,
                            totalVolume: optionInfo.totalVolume,
                            volatility: optionInfo.volatility,
                        },
                        greeks: {
                            delta: optionInfo.delta,
                            theta: optionInfo.theta,
                            vega: optionInfo.vega,
                            gamma: optionInfo.gamma,
                            rho: optionInfo.rho
                        },
                        priceChanges: {
                            lastPrice: optionInfo.last,
                            highPrice: optionInfo.highPrice,
                            lowPrice: optionInfo.lowPrice,
                            percentChange: optionInfo.percentChange,
                            netChange: optionInfo.netChange
                        }
                    });
                }
            }
        }
        callback(bidAsk);
    };
    findTheVertical(bidAsk) {
        console.log(bidAsk);
        for (var i = 1; i < bidAsk.length - 1; i++) {
            if ((bidAsk[i - 1].mainInfo.bid - bidAsk[i].mainInfo.ask) >= (bidAsk[i].mainInfo.strike - bidAsk[i - 1].mainInfo.strike)/2){
                console.log(`You can sell strike width: ${(bidAsk[i].mainInfo.strike - bidAsk[i - 1].mainInfo.strike)} for a price of: ${(bidAsk[i - 1].mainInfo.bid - bidAsk[i].mainInfo.ask)}`);
            }
        }
    };
    render() {
        return (
            <Featured
                stockPriceArr={this.state.stockPriceArr}
                savedTickers={this.props.savedTickers}
                checkIfInWatchlist={this.props.checkIfInWatchlist}
                inWatchlist={this.props.inWatchlist}
                handleSavingToWatchlist={this.props.handleSavingToWatchlist}
                handleRemovingFromWatchlist={this.props.handleRemovingFromWatchlist}
            />
        )
    };
}