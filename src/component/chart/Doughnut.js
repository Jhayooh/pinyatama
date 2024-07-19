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
    tooltip: {
      y: {
        formatter: function (value, opts) {
          const percent = opts.globals.seriesPercent[opts.seriesIndex]
          return `${formatter.format(value)} (${Math.round(percent)}%)`
        },
      },
    },
    plotOptions: {
      pie: {
        customScale: 1,
        offsetX: -38,
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
                return formatter.format(val)
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
                return formatter.format(total)
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
