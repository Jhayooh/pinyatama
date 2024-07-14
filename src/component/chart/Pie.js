import React from 'react';
import Chart from 'react-apexcharts';

function ExamplePieChart({ labels, data, colors, title }) {
  const options = {
    labels: labels,
    heigth: '100%',
    title: {
      text: title,
      align: 'left',
      margin: 18,
      style: {
        fontWeight: 600,

      }
    },
    // stroke: {
    //   show: false
    // },
    legend: {
      show: true,
      position: 'right',
      fontSize: '12px',
      floating: true,
      itemMargin: {
        vertical: 2
      }
    },
    colors: [
      "#F7BF0B", //yilo
      "#40A040", //grin
      "#E74C3C", //rid
    ],
    // chart: {
    //   animations: {
    //     enabled: true,
    //     easing: 'easeinout',
    //     speed: 1000,
    //     animateGradually: {
    //       enabled: true,
    //       delay: 200
    //     },
    //     dynamicAnimation: {
    //       enabled: true,
    //       speed: 350
    //     }
    //   }
    // },
    plotOptions: {
      radialBar: {
        offsetX: -32,
        hollow: {
          margin: 0,
          size: "70%"
        },
        dataLabels: {
          showOn: "always",
          name: {
            fontSize: '12px',
            fontFamily: 'roboto',
            fontWeight: 600,
            color: undefined,
            offsetY: -8,
          },
          value: {
            show: true,
            fontSize: '20px',
            fontFamily: 'roboto',
            fontWeight: 600,
            color: undefined,
            offsetY: 10,
          },
        }
      },

    }
  }
  return (
    data &&
    <Chart options={options} series={data} type="radialBar" />
  );
}

export default ExamplePieChart;
