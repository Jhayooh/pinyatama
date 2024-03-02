import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['Daet', 'Talisay', 'Basud', 'San Vicente', 'Jose Panganiban', 'Labo', 'Capalonga'],
        title: {
          text: 'Expected QP Production',
          align: 'left'
      },
        legend: {
          position: 'bottom',
        },
        chart: {
          // height: 500
        },
        plotOptions: {
          pie: {
            customScale: 1,

          }
        },
        dataLabels: {
          padding: 12
        }
      },
      series: [44, 50, 28, 17, 10, 5, 18]
    }
  }

  render() {

    return (
        <Chart options={this.state.options} series={this.state.series} type="pie" width="100%" height='360' />
    );
  }
}

export default Donut;