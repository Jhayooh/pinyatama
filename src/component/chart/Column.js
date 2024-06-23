import React from 'react';
import Chart from 'react-apexcharts';

const ExampleBarChart = ({ name, data, name1, data1 }) => {
  const options = {
    chart: {
      type: 'bar',
      stacked: true,
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    xaxis: {
      categories: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'],
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'right',
      offsetX: 0,
      offsetY: 50
    },
  };

  const series = [
    {
      name: name,
      data: data
    },
    {
      name: 'Series 2',
      data: data1 
    }
  ];

  return (
    <div className="stacked-bar-chart">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ExampleBarChart;
