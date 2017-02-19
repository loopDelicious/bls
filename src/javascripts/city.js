import React, {Component} from 'react';
import $ from 'jquery';

class City extends Component {

    host = window.location.hostname;

    state = {
        startyear: new Date().getFullYear() - 2,
        endyear: new Date().getFullYear(),
        seriesid: [ 'APU000070111', 'NCU0099573300000' ]
    };

    // SeriesID: NCU5306633300003
    // NC - prefix
    // U - unadjusted for seasonality
    // 53 - state code
    // 0663 - area code
    // 33000 - occupation code (1 of 480 census occupations)
    // 03 - level code
    // SeriesID for no level Computer Programmers in San Francisco-Oakland-San Jose, CA :  NCU0607251722900

    // Geography ****************************
    // All US: 00	9957
    // Seattle: 53	0745 (Seattle-Tacoma-Bremerton, WA)
    // San Francisco: 06	0725 (San Francisco-Oakland-San Jose, CA)
    // Los Angeles: 06	0445 (Los Angeles-Riverside-Orange County, CA)
    // Chicago: 17	0155 (Chicago-Gary-Kenosha, IL-IN-WI)
    //      17, 18, 55
    // Denver: 08	0205 (Denver-Boulder-Greeley, CO)
    // Austin: 48	0064 (Austin-San Marcos, TX)
    // New York: 09	0553 (New York-Northern New Jersey-Long Island, NY-NJ-CT-PA)
    //      34, 36, 42, 09
    // Boston: 23	0105 (Boston-Worcester-Lawrence, MA-NH-ME-CT)
    //      25, 23, 33, 09

    // Occupation ****************************
    // Computer Programmers: 17	229


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
