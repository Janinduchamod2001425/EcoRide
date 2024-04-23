import React, { useState, useEffect } from 'react';
import { Form, Table, FormControl } from 'react-bootstrap';
import axios from 'axios';

const ReportsScreen = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/maintenance/all');
        setMaintenanceRecords(response.data);
        setFilteredRecords(response.data);
      } catch (error) {
        console.error('Error fetching maintenance records:', error);
      }
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    const filterRecords = () => {
      const filtered = maintenanceRecords.filter(record => {
        const serviceDate = new Date(record.serviceDate);
        const fromDateObj = fromDate ? new Date(fromDate) : null;
        const toDateObj = toDate ? new Date(toDate) : null;

        if (fromDateObj && toDateObj) {
          return serviceDate >= fromDateObj && serviceDate <= toDateObj && (status === 'All' || record.status === status);
        } else if (fromDateObj) {
          return serviceDate >= fromDateObj && (status === 'All' || record.status === status);
        } else if (toDateObj) {
          return serviceDate <= toDateObj && (status === 'All' || record.status === status);
        } else {
          return status === 'All' || record.status === status;
        }
      });

      setFilteredRecords(filtered);
    };

    filterRecords();
  }, [fromDate, toDate, status, maintenanceRecords]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = maintenanceRecords.filter(record =>
      Object.values(record).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm)
      )
    );
    setFilteredRecords(filtered);
  };
  

  return (
    <div>
      <h1>Reports</h1>
      <Form>
        <Form.Group controlId='searchTerm'>
          <Form.Label>Search</Form.Label>
          <FormControl type='text' placeholder='Search records...' value={searchTerm} onChange={handleSearch} />
        </Form.Group>

        <Form.Group controlId='fromDate'>
          <Form.Label>From Date</Form.Label>
          <Form.Control type='date' value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='toDate'>
          <Form.Label>To Date</Form.Label>
          <Form.Control type='date' value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='status'>
          <Form.Label>Status</Form.Label>
          <Form.Control as='select' value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value='All'>All</option>
            <option value='Active'>Active</option>
            <option value='Inactive'>Inactive</option>
          </Form.Control>
        </Form.Group>
      </Form>

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
            <th>Maintenance Status</th>
            <th>Mileage</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map(record => (
            <tr key={record._id}>
              <td>{record.make}</td>
              <td>{record.model}</td>
              <td>{record.vin}</td>
              <td>{record.year}</td>
              <td>{record.licensePlate}</td>
              <td>{new Date(record.serviceDate).toLocaleDateString()}</td>
              <td>{record.ownersEmail}</td>
              <td>{record.maintenanceStatus}</td>
              <td>{record.mileage}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ReportsScreen;
