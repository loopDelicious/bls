import React, { Component } from 'react';
import $ from 'jquery';
import City from './city.js';
import Indeed from './indeed.js';

class App extends Component {

    occupations= ["Software Engineer", "Software Developer", "Web Developer", "Front End Developer", "Back End Developer", "Full Stack Developer"];
    locations = ['Seattle', 'San Francisco', 'Los Angeles', 'Chicago', 'Denver', 'Austin', 'New York City', 'Boston'];

    state = {};

    componentDidMount = () => {

        this.occupations.forEach( (occupation) => {
            this.locations.forEach( (location) => {
                $.ajax({
                    url: '/indeed', // talk to server on current page host at port 4700
                    method: 'get',
                    data: {
                        occupation: occupation.split(" "),
                        location: location.split(" ")
                    },
                    success: (res) => {
                        if (!this.state[occupation]) {
                            this.state[occupation] = {}
                        }
                        this.state[occupation][location] = res.totalResults;

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

              <h2>BLS.gov cannot vouch for the data or analyses derived from these data after the data have been retrieved from BLS.gov.</h2>
              <City />
              <Indeed
                  occupations={this.occupations}
                  locations={this.locations}
              />
          </div>
        );
  }
}

export default App;
