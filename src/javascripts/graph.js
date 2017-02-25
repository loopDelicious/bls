import React, {Component} from 'react';
var Chart = require('chart.js');
import Legend from './legend.js';

class Graph extends Component {

    chart = null;

    componentDidMount = () => {
        var legend = this.refs.chart.getChart().generateLegend();

        this.setState({
            legend: legend
        });

        var legend = this.state && this.state.legend || '';

        var seattle = this.props.occupations.map( (occupation) => {
            return this.props.results['Seattle'] && this.props.results['Seattle'][occupation] ? this.props.results['Seattle'][occupation].salary : null
        });
        var sanfrancisco = this.props.occupations.map( (occupation) => {
            return this.props.results['San Francisco'] ? this.props.results['San Francisco'][occupation] : null
        });
        var losangeles = this.props.occupations.map( (occupation) => {
            return this.props.results['Los Angeles'] ? this.props.results['Los Angeles'][occupation] : null
        });
        var chicago = this.props.occupations.map( (occupation) => {
            return this.props.results['Chicago'] ? this.props.results['Chicago'][occupation] : null
        });
        var denver = this.props.occupations.map( (occupation) => {
            return this.props.results['Denver'] ? this.props.results['Denver'][occupation] : null
        });
        var austin = this.props.occupations.map( (occupation) => {
            return this.props.results['Austin'] ? this.props.results['Austin'][occupation] : null
        });
        var newyorkcity = this.props.occupations.map( (occupation) => {
            return this.props.results['New York City'] ? this.props.results['New York City'][occupation] : null
        });
        var boston = this.props.occupations.map( (occupation) => {
            return this.props.results['Boston'] ? this.props.results['Boston'][occupation] : null
        });

        // var data = {
        //     labels: ["January", "February", "March", "April", "May", "June", "July"],
        //     datasets: [
        //         {
        //             label: "My First dataset",
        //             fill: false,
        //             lineTension: 0.1,
        //             backgroundColor: "rgba(75,192,192,0.4)",
        //             borderColor: "rgba(75,192,192,1)",
        //             borderCapStyle: 'butt',
        //             borderDash: [],
        //             borderDashOffset: 0.0,
        //             borderJoinStyle: 'miter',
        //             pointBorderColor: "rgba(75,192,192,1)",
        //             pointBackgroundColor: "#fff",
        //             pointBorderWidth: 1,
        //             pointHoverRadius: 5,
        //             pointHoverBackgroundColor: "rgba(75,192,192,1)",
        //             pointHoverBorderColor: "rgba(220,220,220,1)",
        //             pointHoverBorderWidth: 2,
        //             pointRadius: 1,
        //             pointHitRadius: 10,
        //             data: [65, 59, 80, 81, 56, 55, 40],
        //             spanGaps: false,
        //         }
        //     ]
        // };

        var chartData = {
            labels: this.props.occupations,
            datasets: [{
                label: "Seattle",
                lineTension: 0.1,
                backgroundColor: "rgba(153,255,51,0.4)",
                borderColor: "rgba(153,255,51,1)",
                pointBorderColor: "rgba(220,220,220,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                data: seattle
            }, {
                label: "San Francisco",
                lineTension: 0.1,
                backgroundColor: "rgba(0,206,209,0.4)",
                borderColor: "rgba(0,206,209,1)",
                pointBorderColor: "rgba(220,220,220,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                data: sanfrancisco
            }, {
                label: "Los Angeles",
                lineTension: 0.1,
                backgroundColor: "rgba(255,215,0,0.4)",
                borderColor: "rgba(255,215,0,1)",
                pointBorderColor: "rgba(220,220,220,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                data: losangeles
            }, {
                label: "Chicago",
                lineTension: 0.1,
                backgroundColor: "rgba(255,50,147,0.4)",
                borderColor: "rgba(255,50,147,1)",
                pointBorderColor: "rgba(220,220,220,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                data: chicago
            }, {
                label: "Denver",
                lineTension: 0.1,
                backgroundColor: "rgba(153,50,204,0.4)",
                borderColor: "rgba(153,50,204,1)",
                pointBorderColor: "rgba(220,220,220,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                data: denver
            }, {
                label: "Austin",
                lineTension: 0.1,
                backgroundColor: "rgba(255,153,0,0.4)",
                borderColor: "rgba(255,153,0,1)",
                pointBorderColor: "rgba(220,220,220,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                data: austin
            }, {
                label: "New York City",
                lineTension: 0.1,
                backgroundColor: "rgba(218,112,214,0.4)",
                borderColor: "rgba(218,112,214,1)",
                pointBorderColor: "rgba(220,220,220,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                data: newyorkcity
            }, {
                label: "Boston",
                lineTension: 0.1,
                backgroundColor: "rgba(0,0,255,0.4)",
                borderColor: "rgba(0,0,255,1)",
                pointBorderColor: "rgba(220,220,220,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                data: boston
            }]
        };

        // var chartData = {
        //     labels: this.props.occupation,
        //     datasets: [
        //         {
        //             label: "My First dataset",
        //             fill: false,
        //             lineTension: 0.1,
        //             backgroundColor: "rgba(75,192,192,0.4)",
        //             borderColor: "rgba(75,192,192,1)",
        //             borderCapStyle: 'butt',
        //             borderDash: [],
        //             borderDashOffset: 0.0,
        //             borderJoinStyle: 'miter',
        //             pointBorderColor: "rgba(75,192,192,1)",
        //             pointBackgroundColor: "#fff",
        //             pointBorderWidth: 1,
        //             pointHoverRadius: 5,
        //             pointHoverBackgroundColor: "rgba(75,192,192,1)",
        //             pointHoverBorderColor: "rgba(220,220,220,1)",
        //             pointHoverBorderWidth: 2,
        //             pointRadius: 1,
        //             pointHitRadius: 10,
        //             data: [seattle, sanfrancisco, losangeles, chicago, denver, austin, newyorkcity, boston],
        //             spanGaps: false,
        //         }
        //     ]
        // };

        var chartOptions = {
            responsive: true,
        };


        // TODO: update chart data to chart.js format (vs. react-chartjs)
        this.chart = new Chart(this.refs.myChart, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });

    };

    render() {


        return (
            <div className="bar graph clearfix">
                <h2>Tech Salaries by City</h2>
                <canvas ref="myChart" width="400" height="400" />
                {/*<Legend*/}
                    {/*data={chartData}*/}
                    {/*title="city-occupations"*/}
                    {/*dangerouslySetInnerHTML={{ __html: legend }}*/}
                {/*/>*/}
            </div>
        )
    };
}

export default Graph;
