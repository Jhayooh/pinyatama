import React from 'react';
import Chart from 'react-apexcharts';

function ExamplePieChart({ labels, data, colors, title, onPieClick }) {
  // Slice the data and labels to limit to 10 items
  const limitedLabels = labels ? labels.slice(0, 10) : ["Default Label"];
  const limitedData = data ? data.slice(0, 10) : [44, 45, 2, 3, 4, 5, 6, 7, 8];

  const options = {
    labels: limitedLabels,
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
            const clickedLabel = limitedLabels[dataPointIndex];
            const clickedValue = limitedData[dataPointIndex];
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
      padding: 12,
    },
    colors: colors || [
      '#FF6700',
      '#FFB000',
      '#FFE600',
      '#7FDD05',
      '#00A585',
      '#22BCF2',
      '#1256CC',
      '#803AD0',
      '#B568F2',
      '#CC2782',
      '#FF71BF',
      '#7EE8C7',
    ],
  };

  return <Chart options={options} series={limitedData} type="pie" />;
}

export default ExamplePieChart;
