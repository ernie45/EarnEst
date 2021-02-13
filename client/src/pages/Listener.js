import React, { Component } from "react";
import API from "../utils/API";
import { Featured } from "./Featured";

export class Listener extends Component {
    constructor(props) {
        super(props);
        this.state = {


            //props.savedTickers
            //props.checkIfInWatchlist
            //props.inWatchlist
            //props.handleSavingToWatchlist
            //props.handleRemovingFromWatchlist
        };
    };
    componentDidMount = () => {
        var today;
        var exp;
        this.getExpirationDate(expire => {
            exp = `${expire.yyyy}-${expire.mm}-${expire.dd}`;
        });
        this.getTodaysDate(hoy => {
            today = `${hoy.yyyy}-${hoy.mm}-${hoy.dd}`
        });
        console.log(today);
        console.log(exp);
        this.searchOptionsChain("cgc", today, exp);
    };
    searchOptionsChain(ticker, today, expiration){
        API.searchOptionsChain(ticker.toUpperCase(), today, expiration).then(data => {
            console.log(data.data);
            console.log(data.data.calls);
            console.log(data.data.puts);
        });
    };
    getTodaysDate(callback){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var dateObj = {dd: dd, mm: mm, yyyy: yyyy};
        callback(dateObj);
    };
    getExpirationDate(callback){
        this.getTodaysDate(date => {
            var expDay = String(parseInt(date.dd) + 7).padStart(2, "0");
            var expMonth = date.mm;
            var expYear = date.yyyy;
            if (date.mm === "09" || date.mm === "04" || date.mm === "06" || date.mm === "11"){
                if (parseInt(expDay) > 30){
                    expMonth = String(parseInt(date.mm) + 1).padStart(2, "0");
                    expDay = String(parseInt(expDay) - 30).padStart(2, "0");
                }
            }
            else {
                if (parseInt(expDay) > 31){
                    expMonth = String(parseInt(date.mm) + 1).padStart(2, "0");
                    expDay = String(parseInt(expDay) - 31).padStart(2, "0");
                }
            }
            if (parseInt(expMonth) > 12){
                expYear = String(parseInt(date.mm) + 1).padStart(2, "0");
                expDay = "01";
            }
            var expObj = {dd: expDay, mm: expMonth, yyyy: expYear};
            callback(expObj);
        });
    };
    render() {
        return (
            <Featured
                savedTickers={this.props.savedTickers}
                checkIfInWatchlist={this.props.checkIfInWatchlist}
                inWatchlist={this.props.inWatchlist}
                handleSavingToWatchlist={this.props.handleSavingToWatchlist}
                handleRemovingFromWatchlist={this.props.handleRemovingFromWatchlist}
            />
        )
    };
}