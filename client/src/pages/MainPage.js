import React, {Component} from "react";
import {Featured} from "./Featured";
import {Search} from "./Search";
import {Watchlist} from "./Watchlist";

class MainPage extends Component{
    /** Define the state of the page */
    state = {
        currentPage: "Watchlist"
    };
    /** Upon loading the page */
    componentDidMount = () => {};
    /** Change the tab to the page passsed in */
    handlePageChange = page => {
        /** Change the currentPage state to the props passed in */
        /** This page will become active */
        this.setState({
            currentPage: page
        });
    };
    renderPage = () => {
        if (this.state.currentPage === "Featured"){
            return <Featured
                currentPage={this.state.currentPage}
            />
        } 
        else if (this.state.currentPage === "Search"){
            return <Search/>
        }
        else if (this.state.currentPage === "Watchlist"){
            return <Watchlist/>
        }
    };
    render(){
        return(
            <div>
                {this.renderPage()}
            </div>
        )
    };
};

export default MainPage;