import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; // Import axios for API requests
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);

  useEffect(() => {
    // Fetch maintenance records from the API
    axios.get('http://localhost:2000/api/maintenance/allactive')
      .then(response => {
        setMaintenanceRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching maintenance records:', error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.put(`http://localhost:2000/api/maintenance/delete/${id}`);
      // Refresh the maintenance records after deletion
      const updatedRecords = maintenanceRecords.filter(record => record.id !== id);
      setMaintenanceRecords(updatedRecords);
      console.log('Record deleted successfully');
      alert('Record deleted successfully');
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div>
      <h1>Maintenance Records</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>VIN</th>
            <th>Year</th>
            <th>License Plate</th>
            <th>Service Date</th>
            <th>Owners Email</th>
            <th>Actions</th> {/* Updated header for actions */}
          </tr>
        </thead>
        <tbody>
          {maintenanceRecords.map(record => (
            <tr key={record._id}>
              <td>{record.make}</td>
              <td>{record.model}</td> {/* Changed 'id' to 'td' for Model */}
              <td>{record.vin}</td>
              <td>{record.year}</td>
              <td>{record.licensePlate}</td>
              <td>{new Date(record.serviceDate).toLocaleDateString()}</td>
              <td>{record.ownersEmail}</td>
              <td>
                <Link to={`/edit/${record.id}`}>
                  <Button variant="primary">Edit Record</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(record.id)}>Delete</Button> {/* Added Delete button */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default HomeScreen;
