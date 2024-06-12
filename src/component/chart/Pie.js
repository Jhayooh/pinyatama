import React from 'react';
import Chart from 'react-apexcharts';

function ExamplePieChart({ labels, data, colors, title }) {
  const options = {
    labels: labels || ["Default Label"],
    title: {
      text: title || 'labor and Material Cost',
      align: 'left'
    },
    legend: {
      position: 'bottom',
    },
    chart: {
      height:'100%', weight:'100%' 
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

  const series = data || [44, 45]
  return (
    <Chart options={options} series={series} type="pie"  />
  );
}

export default ExamplePieChart;
