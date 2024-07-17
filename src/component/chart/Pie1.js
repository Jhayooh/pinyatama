import React from 'react';
import Chart from 'react-apexcharts';

function ExamplePieChart({ labels, data, colors, title }) {
  // Slice the data and labels to limit to 10 items
  const limitedLabels = labels ? labels.slice(0, 10) : ["Default Label"];
  const limitedData = data ? data.slice(0, 10) : [44, 45, 2, 3, 4, 5, 6, 7, 8,];

  const options = {
    labels: limitedLabels,
    title: {
      text: title || 'Labor and Material Cost',
      align: 'left'
    },
    legend: {
      position: 'bottom',
    },
    chart: {
      height: '100%', width: '100%'
    },
    plotOptions: {
      pie: {
        customScale: 1,
      }
    },
    dataLabels: {
      padding: 12
    },
    colors: colors || ['#ffd700', '#065535', '#ffff00', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#800080', '#cc0000']
  };

  return (
    <Chart options={options} series={limitedData} type="pie" />
  );
}

export default ExamplePieChart;
