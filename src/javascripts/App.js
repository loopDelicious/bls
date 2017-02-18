import React, { Component } from 'react';
import City from './city.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h2>BLS.gov cannot vouch for the data or analyses derived from these data after the data have been retrieved from BLS.gov.</h2>
        <City />
      </div>
    );
  }
}

export default App;
