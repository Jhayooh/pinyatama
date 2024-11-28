import React from 'react';
import Chart from 'react-apexcharts';

function ExamplePieChart({ labels, data, colors, title, setSelectedMun }) {

  const options = {
    labels: labels,
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
          if (setSelectedMun) {
            setSelectedMun(config.w.config.labels[config.dataPointIndex])
            console.log('selected muni', config.w.config.labels[config.dataPointIndex])
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

  return <Chart options={options} series={data} type="pie" />;
}

export default ExamplePieChart;
