import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ExamplePieChart({ labels, data, colors, info }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const options = {
    labels: labels || ["Default Label"],
    title: {
      text: 'Labor and Material Cost',
      align: 'left'
    },
    legend: {
      position: 'bottom',
    },
    chart: {
      height: '100%', 
      width: '100%',
      events: {
        click: function(event, chartContext, config) {
          handleShow();
        }
      }
    },
    plotOptions: {
      pie: {
        customScale: 1,
      }
    },
    dataLabels: {
      padding: 12
    },
    colors: colors || ['#ffd700', '#065535', '#ffff00', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#800080', '#cc0000']
  };

  const series = data || [44, 45];

  return (
    <>
      <Chart options={options} series={series} type="pie" />

      <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Chart Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Data 4</td>
          <td>Data 5</td>
          <td>Data 6</td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
}

export default ExamplePieChart;
