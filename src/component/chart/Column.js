import { Label } from '@mui/icons-material';
import React from 'react';
import Chart from 'react-apexcharts';

const Column = ({ series }) => {
  var options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        tools: {
          download: true,
          selection: false,
          zoom: true,
          zoomin: false,
          zoomout: false,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: []
        },
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [{
      // breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        columnWidth: '40%',
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: 'end', // 'around', 'end'
        borderRadiusWhenStacked: 'last', // 'all', 'last'
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    xaxis: {
      type: 'datetime',
      Label: {
        formatter: function (value, stamp) {
          const date = new Date(stamp)
          const options = { year: 'numeric', month: 'short' }
          return date.toLocaleDateString('en-US', options).replace('.', '.')
        }
      },
      categories: series.categories,
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  };
  return (
    <Chart options={options} height={320} type='bar' series={series.series} />
  )
}

export default Column

