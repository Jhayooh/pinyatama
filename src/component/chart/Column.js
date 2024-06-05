  import React from 'react';
  import Chart from 'react-apexcharts';

  function ExampleBarChart({ labels, data }) {
    const options = {
      chart: {
        type: 'bar',
       
      },
      title: {
        text: 'Pineapple Price',
        align: 'left'
      },
      legend: {
        position: 'bottom',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '40%', // Adjust the percentage to control the bar thickness
        }
      },
      xaxis: {
        categories: labels || ["Default Label"],
      },
      dataLabels: {
        enabled: true,
      }
    };

    const series = [{
      name: 'Production',
      data: data || [44, 45]
    }];

    return (
      <Chart options={options} series={series} type="bar" />
    );
  }

  export default ExampleBarChart;
