import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default class Pie extends Component {
    render() {
		const options = {
            height: 280,
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Expected QP Production per piece"
			},
            legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				dockInsidePlotArea: true,
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{y}%",
				dataPoints: [
					{ y: 42, label: "Daet" },
					{ y: 20, label: "Talisay" },
					{ y: 18, label: "Basud" },
					{ y: 14, label: "San Vicente" },
					{ y: 12, label: "Jose Panganiban" },
                    { y: 8, label: "Labo" },
                    { y: 6, label: "Capalonga" }
				]
			}]
		}
		return (
		<>
			<CanvasJSChart options = {options} />
		</>
		);
	}
}