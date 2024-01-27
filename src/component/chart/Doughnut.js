import React, {Component} from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
import '../FarmSchedule.css'
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Doughnut extends Component {
    render() {
		const options = {
			height: 280,
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: this.props.title,
                // fontSize: 10,
			},
            subtitles: [
                {
				text: this.props.label1,
				verticalAlign: "center",
				dockInsidePlotArea: true,
                fontSize: 18,
                }
            ],
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				dockInsidePlotArea: true,
			},
			data: [{
				type: "doughnut",
				radius: "80%",
				showInLegend: true,
				indexLabel: "{name}: #percent%",
				toolTipContent: "{name}: {y} (#percent%)",
				dataPoints: this.props.data
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

