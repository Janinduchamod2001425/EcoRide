import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const MaintenanceTable = ({ records = [] }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Vehicle Number</th>
          <th>VIN</th>
          <th>License Plate</th>
          <th>Service Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={`${record.vehicleNumber}-${record.vin}-${record.licensePlate}`}>
            <td>{record.vehicleNumber}</td>
            <td>{record.vin}</td>
            <td>{record.licensePlate}</td>
            <td>{new Date(record.serviceDate).toLocaleDateString()}</td>
            <td>
              <Button variant="primary">Edit Record</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default MaintenanceTable;