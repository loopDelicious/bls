import React, {Component} from 'react';
import $ from 'jquery';


class City extends Component {

    host = this.location.window;

    componentDidMount = () => {

        var startyear;
        var endyear;
        var seriesid;

        // POST request
        $.ajax({
            url: 'http://' + this.host + ':5000/bls',
            type: 'post',
            data: {
                startyear: startyear,
                endyear: endyear,
                seriesid: seriesid
            },
            contentType: 'application/json',
            success: (response) => {
                console.log(response);
            }
        });
    };

    render() {

        return (
            <div className="city-graph">

            </div>
        )
    };
}

export default City;
