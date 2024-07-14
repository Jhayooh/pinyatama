import React from 'react';
import Chart from 'react-apexcharts';

function ExamplePieChart({ labels, data, colors, title }) {
  const options = {
    labels: labels || ["Default Label"],
    stroke: {
      show: false
    },
    title: {
      text: title || 'Labor and Material Cost',
      align: 'left'
    },
    legend: {
      position: 'bottom',
    },
    chart: {
      height:'100%',
      width:'100%' 
    },
    plotOptions: {
      pie: {
        customScale: 1,
      }
    },
    dataLabels: {
      padding: 12
    },
      colors: ['#ffd700', '#065535', '#ffff00', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#800080', '#cc0000']
    
  };
  return (
    data &&
    <Chart options={options} series={data} type="pie"  />
  );
}

export default ExamplePieChart;
