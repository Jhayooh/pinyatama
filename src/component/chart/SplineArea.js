import React, { Component } from 'react'
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class SplineArea extends Component {
  render() {
    const options = {
        height: 280,
        // width: 380,
        animationEnabled: true,
        title: {
            text: "Ani ng Pinya",
            margin: 32,
        },
        axisX:{
            valueFormatString:"####"
         },
        data: [{
            tooltip: "hidden",
            type: "splineArea",
            xValueFormatString: "Total Harvest: ####",
            dataPoints: [
                { x: 2004, y: 5000 },
                { x: 2012, y: 49243 },
                { x: 2018, y: 16876 },
            ]
        }]
    }
    return (
    <>
        <CanvasJSChart options = {options}
            /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </>
    );  
}
}
