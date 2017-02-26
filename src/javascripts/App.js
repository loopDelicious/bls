import React, { Component } from 'react';
import $ from 'jquery';
import City from './city.js';
import Graph from './graph.js';
import Indeed from './indeed.js';

// Object.prototype.keys = function() {
//     return Object.keys(this);
// };

class App extends Component {

    host = window.location.hostname;

    occupations= ["Software Engineer", "Software Developer", "Web Developer", "Front End Developer", "Back End Developer", "Full Stack Developer", "Mobile Developer", "Application Developer", "Integration Engineer"];
    // occupations= ["Software Engineer", "Full Stack Developer"]; // for testing
    locations = ['Seattle WA', 'San Francisco CA', 'Los Angeles CA', 'Chicago IL', 'Denver CO', 'Austin TX', 'New York City NY', 'Boston MA'];
    // locations = ['Seattle WA', 'San Francisco CA']; // for testing

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
                        if (!this.state[occupation][location]) {
                            this.state[occupation][location] = {}
                        }
                        if (!this.state[occupation][location].salary) {
                            this.state[occupation][location].salary = res.salary;
                        }
                        if (!this.state[occupation][location].sample) {
                            this.state[occupation][location].sample = res.sample;
                        }
                        if (!this.state[occupation][location].relative) {
                            this.state[occupation][location].relative = res.relative;
                        }
                        if (!this.state[occupation][location].minimum) {
                            this.state[occupation][location].minimum = res.minimum;
                        }
                        if (!this.state[occupation][location].maximum) {
                            this.state[occupation][location].maximum = res.maximum;
                        }
                        this.setState(this.state);
                    }
                });
            })
        })
    };

    render() {
        var columnHeaders = this.locations.map( (location) => {
            return <td className="location-header" key={location}>{location}</td>;
        });

        var rows = this.occupations.map( (occupation, i) => {

            var salaries = this.locations.map( (location, index) => {

                return (
                    <td key={location + index}>
                        <table className="embedded-table">
                            <tbody>
                            <tr>
                                <td className="salaries min-salary">min {this.state[occupation] && this.state[occupation][location] ? this.state[occupation][location].minimum : null}</td>
                                <td className="salaries max-salary">max {this.state[occupation] && this.state[occupation][location] ? this.state[occupation][location].maximum : null}</td>
                                <td className="salaries">sample {this.state[occupation] && this.state[occupation][location] ? this.state[occupation][location].sample[0].split(" ")[3] : null}</td>
                            </tr>
                            <tr>
                            <td />
                            <td />
                            {/*<td>{this.state[occupation] && this.state[occupation][location] ? this.state[occupation][location].relative : null}</td>*/}
                            <td className="salaries average-salary">avg {this.state[occupation] && this.state[occupation][location] ? this.state[occupation][location].salary : null}</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>

                )
            });

            return (
                <tr key={occupation + i}>
                    <td className="occupation-row">{occupation}</td>
                    {salaries}
                </tr>
            )
        });
        return (
          <div className="App">

              <div id="intro">
                  <div className="width">
                      <h2>Tech Salaries by City</h2>
                      <h3>
                          <i className="fa fa-medium fa-lg" /> Read on <a href="https://medium.com/@joycelin.codes/always-be-coding-regional-differences-in-programming-languages-9957785dd4e6#.oq7bf9wki">Medium</a>
                          <span className="spacer"> | </span>
                          <i className="fa fa-github fa-lg" /> Fork me on <a href="https://github.com/loopDelicious/bls">Github</a>
                      </h3>
                  </div>
              </div>
              <div className="width">
                  <p>Salary estimated from employees, users, and past and present job advertisements on Indeed in the past 12 months.</p>
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
                  {Object.keys(this.state).length === 0 ?
                      null :
                      <Graph
                          occupations={this.occupations}
                          locations={this.locations}
                          results={this.state}
                      />
                  }
                  <hr />
                  {/*<h2>BLS.gov cannot vouch for the data or analyses derived from these data after the data have been retrieved from BLS.gov.</h2>*/}
                  {/*<City />*/}
                  {/*<Indeed*/}
                      {/*occupations={this.occupations}*/}
                      {/*locations={this.locations}*/}
                  {/*/>*/}
              </div>
          </div>
        );
  }
}

export default App;
