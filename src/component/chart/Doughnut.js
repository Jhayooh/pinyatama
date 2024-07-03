import React from 'react';
import Chart from 'react-apexcharts';

function ExamplePieChart({ labels, data, title }) {
  const options = {
    labels: labels,
    title: {
      text: title || 'Expected QP Production',
      align: 'left'
    },
    legend: {
      position: 'bottom',
    },
    colors: [
      '#2E93fA',
      '#66DA26',
      '#546E7A',
      '#E91E63',
      '#FF9800'
    ],
    chart: {
      height: '100%', weight: '100%'
    },
    plotOptions: {
      pie: {
        customScale: 1,
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '8'
            },
            value: {
              formatter: function (val) {
                return val
              }
            },
            total: {
              show: true
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(0) + '%'
      },
      padding: 12
    }
  };

  return (
    data &&
    <Chart options={options} series={data} type="donut" />
  );
}

export default ExamplePieChart;
