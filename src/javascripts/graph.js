import React, {Component} from 'react';
var Chart = require('chart.js');

class Graph extends Component {

    chart = null;
    occupation = 'Full Stack Developer';

    state = {
        occupation: this.occupation,
    };

    getSalaryData = () => {
        return Object.keys(this.props.results[this.state.occupation]).map( (city) => {
            return parseInt(this.props.results[this.state.occupation][city].salary[0].replace(/\$|,/g, ''), 10);
        });
    };

    getMaxSalary = () => {
        return Object.keys(this.props.results[this.state.occupation]).map( (city) => {
            return parseInt(this.props.results[this.state.occupation][city].maximum[0].replace(/\$|,/g, ''), 10);
        });
    };

    getMinSalary = () => {
        return Object.keys(this.props.results[this.state.occupation]).map( (city) => {
            return parseInt(this.props.results[this.state.occupation][city].minimum[0].replace(/\$|,/g, ''), 10);
        });
    };

    handleSelection = (event) => {
        this.setState({
            occupation: event.target.value,
        });
        this.chart.data.datasets[0].data = this.getSalaryData();
        this.chart.update();
    };

    componentDidUpdate = () => {

        var salaryData = this.getSalaryData();
        var maxData = this.getMaxSalary();
        var minData = this.getMinSalary();

        var data = {
            labels: this.props.locations,
            datasets: [
                {
                    type: 'bar',
                    label: 'minimum for ' + this.state.occupation,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 1,
                    data: minData,
                },
                {
                    type: 'bar',
                    label: 'maximum for ' + this.state.occupation,
                    backgroundColor: [
                        'rgba(153,255,51, 0.2)',
                        'rgba(0,206,209, 0.2)',
                        'rgba(255,215,0, 0.2)',
                        'rgba(255,50,147, 0.2)',
                        'rgba(153,50,204, 0.2)',
                        'rgba(255,153,0, 0.2)',
                        'rgba(218,112,214, 0.2)',
                        'rgba(0,0,255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(153,255,51, 1)',
                        'rgba(0,206,209, 1)',
                        'rgba(255,215,0, 1)',
                        'rgba(255,50,147, 1)',
                        'rgba(153,50,204, 1)',
                        'rgba(255,153,0, 1)',
                        'rgba(218,112,214, 1)',
                        'rgba(0,0,255, 1)',
                    ],
                    borderWidth: 1,
                    data: maxData,
                },
                {
                    type: 'line',
                    label: 'average for ' + this.state.occupation,
                    fill: false,
                    borderColor: "black",
                    borderWidth: 1,
                    data: salaryData,
                }
            ]
        };

        this.chart = new Chart(this.refs.myChart, {
            type: 'bar',
            data: data,
            options: {
                legend: {
                    display: false,
                },
                tooltips: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleMarginBottom: 10,
                    bodySpacing: 10,
                    xPadding: 10,
                    yPadding: 10,
                },
                scales: {
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero:true
                        },
                    }],
                    xAxes: [{
                        stacked: true,
                    }]
                }
            }
        });
    };

    render() {

        return (
            <div className="bar graph clearfix">
                <h2>Displaying the average annual salary (USD) for: </h2>
                <select className="title-selection" value={this.state.occupation} onChange={this.handleSelection.bind(this)}>
                    { this.props.occupations.map( (occupation) => {
                        return <option key={occupation} value={occupation}>{occupation} </option>
                    })
                    }
                </select>
                <canvas id="myChart" ref="myChart" width="400" height="400" />
            </div>
        )
    };
}

export default Graph;
