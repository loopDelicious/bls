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

        var chartData = {
            labels: this.props.occupations,
            type: 'line',
            datasets: [{
                label: "Seattle",
                fillColor: "rgba(153,255,51,0.4)",
                strokeColor: "rgba(153,255,51,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: seattle
            }, {
                label: "San Francisco",
                fillColor: "rgba(0,206,209,0.4)",
                strokeColor: "rgba(0,206,209,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: sanfrancisco
            }, {
                label: "Los Angeles",
                fillColor: "rgba(255,215,0,0.4)",
                strokeColor: "rgba(255,215,0,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: losangeles
            }, {
                label: "Chicago",
                fillColor: "rgba(255,50,147,0.4)",
                strokeColor: "rgba(255,50,147,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: chicago
            }, {
                label: "Denver",
                fillColor: "rgba(153,50,204,0.4)",
                strokeColor: "rgba(153,50,204,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: denver
            }, {
                label: "Austin",
                fillColor: "rgba(255,153,0,0.4)",
                strokeColor: "rgba(255,153,0,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: austin
            }, {
                label: "New York City",
                fillColor: "rgba(218,112,214,0.4)",
                strokeColor: "rgba(218,112,214,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: newyorkcity
            }, {
                label: "Boston",
                fillColor: "rgba(0,0,255,0.4)",
                strokeColor: "rgba(0,0,255,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: boston
            }]
        };

        var chartOptions = {
            responsive: true,
        };

        this.chart = new Chart(this.refs.myChart, {
            type: 'bar',
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
