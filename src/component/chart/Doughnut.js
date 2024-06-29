import React from 'react';
import Chart from 'react-apexcharts';

function ExamplePieChart({ labels, data, title }) {
  console.log("data sa donut", data)
  const options = {
    labels: labels,
    title:  {
      text: title || 'Expected QP Production',
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
        donut: {
          labels: {
            show: true,

          }
        }
      }
    },
    dataLabels: {
      padding: 12
    }
  };

  const series = data || [44, 45]
  return (
    <Chart options={options} series={data} type="donut"  />
  );
}

export default ExamplePieChart;
