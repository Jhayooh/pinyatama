import React from 'react';
import Chart from 'react-apexcharts';

const SplineChart = ({ data }) => {
  const options = {
    chart: {
      type: 'line',
    },
    series: [{
      name: 'Pineapple',
      data: data,
    }],
    xaxis: {
      categories: [],
    },
  };

  return (
    <Chart options={options} series={options.series} type="line" height={350} />
  );
};

export default SplineChart;
