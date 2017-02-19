import React, {Component} from 'react';
import $ from 'jquery';

class City extends Component {

    host = window.location.hostname;

    state = {
        startyear: new Date().getFullYear() - 2,
        endyear: new Date().getFullYear(),
        seriesid: [ 'LAUCN040010000000005', 'LAUCN040010000000006' ]
    };

    handleDisplay = () => {

        // POST request
        $.ajax({
            url: 'http://' + this.host + ':4700/bls',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                startyear: this.state.startyear,
                endyear: this.state.endyear,
                seriesid: this.state.seriesid
            }),
            success: (response) => {
                console.log(response);
            }
        });
    };

    render() {

        return (
            <div className="city-graph">
                <h2>i am city-graph.</h2>
                <button onClick={this.handleDisplay}>send</button>
            </div>
        )
    };
}

export default City;
