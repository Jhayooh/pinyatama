import React from 'react';
import Chart from 'react-apexcharts';


const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function ExamplePieChart({ labels, data, title, onPieClick }) {
  const colors = labels ? labels.map(() => generateRandomColor()) : ["#FF6700"];

  const options = {
    labels: labels || ["Default Label"],
    title: {
      text: title || 'Undefined',
      align: 'left',
    },
    legend: {
      position: 'bottom',
    },
    chart: {
      height: '100%',
      width: '100%',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          if (onPieClick) {
            const { dataPointIndex } = config;
            const clickedLabel = labels[dataPointIndex];
            const clickedValue = data[dataPointIndex];
            onPieClick({ label: clickedLabel, value: clickedValue, index: dataPointIndex });
          }
        },
      },
    },
    plotOptions: {
      pie: {
        customScale: 1,
      },
    },
    dataLabels: {
      padding: 2,
    },
    colors: colors, 
  };

  return <Chart options={options} series={data} type="pie" />;
}

export default ExamplePieChart;
