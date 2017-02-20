import React, {Component} from 'react';

class Indeed extends Component {

    host = window.location.hostname;

    city = "San Francisco";
    occupation = "Software Engineer";

    state = {
        city: this.city,
        occupation: this.occupation
    };

    handleOccupation = (event) => {
        this.setState({
            occupation: event.target.value
        });
    };

    handleCity = (event) => {
        this.setState({
            city: event.target.value
        });
    };

    render() {

        return (
            <div className="salary-graph">
                <h2>Salary Comparison</h2>
                <p>Select occupation and location.</p>
                <select className="occupation-selection" ref="occupation" value={this.state.occupation} onChange={this.handleOccupation.bind(this)}>
                    { this.props.occupations.map((occupation) => {
                        return <option value={occupation} >{occupation}</option>
                    })
                    }
                </select>
                <select className="city-selection" ref="city" value={this.state.city} onChange={this.handleCity.bind(this)}>
                    { this.props.locations.map((location) => {
                        return <option value={location} >{location}</option>
                    })
                    }
                </select>
                <h3>{this.state.occupation} in {this.state.city}</h3>
            </div>
        )
    };
}

export default Indeed;
