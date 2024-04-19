import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Column extends Component {
  render() {
    const { data, title } = this.props;

    const options = {
      exportEnabled: true,
      height: 280,
      // width: 380,
      title: {
        text: title
      },
      data: [
        {
          type: "column",
          dataPoints: data
        }
      ]
    };

    return (
      <>
        <CanvasJSChart options={options} />
      </>
    );
  }
}

export default Column;
