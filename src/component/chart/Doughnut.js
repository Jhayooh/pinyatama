import React from 'react';
import Chart from 'react-apexcharts';

function ExamplePieChart({ labels, data, title }) {
  const formatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  })
  const options = {
    labels: labels,
    title: {
      text: title,
      align: 'left',
      margin: 18,
      style: {
        fontWeight: 600,

      }
    },
    stroke: {
      show: false
    },
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
    chart: {
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 200
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    plotOptions: {
      pie: {
        customScale: 1,
        offsetX: -32,
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              fontSize: '12px',
              fontFamily: 'roboto',
              fontWeight: 600,
              color: undefined,
              offsetY: -8,
              formatter: function (val) {
                return val
              }
            },
            value: {
              show: true,
              fontSize: '20px',
              fontFamily: 'roboto',
              fontWeight: 600,
              color: undefined,
              offsetY: 10,
              formatter: function (val) {
                switch (title.toLowerCase()) {
                  case 'expected qp production':
                    return val + '%'
                  case 'production cost':
                    return formatter.format(val)
                  default:
                    return parseInt(val).toLocaleString()
                }
              }
            },
            total: {
              show: true,
              fontFamily: 'roboto',
              fontSize: '12px',
              fontWeight: 600,
              color: '#333333',
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                })
                switch (title.toLowerCase()) {
                  case 'expected qp production':
                    return total + '%'
                  case 'production cost':
                    return formatter.format(total)
                  default:
                    return total.toLocaleString()
                }
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val.toFixed(0) + '%'
      },
    },
  }

  return (
    data &&
    <Chart options={options} series={data} type="donut" />
  );
}

export default ExamplePieChart;
