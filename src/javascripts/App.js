import React, { Component } from 'react';
import $ from 'jquery';
import City from './city.js';
import Graph from './graph.js';
import Indeed from './indeed.js';

class App extends Component {

    host = window.location.hostname;

    // occupations= ["Software Engineer", "Software Developer", "Web Developer", "Front End Developer", "Back End Developer", "Full Stack Developer"];
    occupations= ["Software Engineer", "Full Stack Developer"];
    // locations = ['Seattle WA', 'San Francisco CA', 'Los Angeles CA', 'Chicago IL', 'Denver CO', 'Austin TX', 'New York City NY', 'Boston MA'];
    locations = ['Seattle WA', 'San Francisco CA'];

    state = {};

    componentDidMount = () => {

        this.occupations.forEach( (occupation) => {
            this.locations.forEach( (location) => {
                $.ajax({
                    url: 'http://' + this.host + ':4700/indeed', // talk to server on current page host at port 4700
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        occupation: occupation.split(" "),
                        location: location.split(" ")
                    }),
                    success: (res) => {
                        if (!this.state[occupation]) {
                            this.state[occupation] = {}
                        }
                        this.state[occupation][location] = res.salary;

                        this.setState(this.state);
                    }
                });
            })
        })
    };

    render() {
        var columnHeaders = this.locations.map( (location) => {
            return <td key={location}>{location}</td>;
        });

        var rows = this.occupations.map( (occupation) => {

            var salaries = this.locations.map( (location) => {
                return <td key={'table'+location}>{this.state[occupation] ? this.state[occupation][location] : null}</td>
            });

            return (
                <tr key={occupation}>
                    <td>{occupation}</td>
                    {salaries}
                </tr>
            )
        });
        return (
          <div className="App">
              <table>
                  <thead>
                  <tr>
                      <td />
                      {columnHeaders}
                  </tr>
                  </thead>

                  <tbody>
                  {rows}
                  </tbody>
              </table>
              <hr />
              <Graph
                  occupations={this.occupations}
                  locations={this.locations}
                  results={this.state}
              />
              {/*<h2>BLS.gov cannot vouch for the data or analyses derived from these data after the data have been retrieved from BLS.gov.</h2>*/}
              {/*<City />*/}
              {/*<Indeed*/}
                  {/*occupations={this.occupations}*/}
                  {/*locations={this.locations}*/}
              {/*/>*/}
          </div>
        );
  }
}

export default App;
