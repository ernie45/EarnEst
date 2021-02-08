import React, {Component} from "react";
import {Featured} from "./Featured";
import {Search} from "./Search";

class MainPage extends Component{
    /** Define the state of the page */
    state = {
        currentPage: "Featured"
    };
    /** Upon loading the page */
    componentDidMount = () => {};
    /** Change the tad to the page passsed in */
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
        };
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