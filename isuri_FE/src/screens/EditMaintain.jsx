import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom'; 

const EditMaintenanceRecord = ({ match }) => {
  const [record, setRecord] = useState({
    vin: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    serviceDate: '',
    nextServiceDate: '',
    licensePlate: '',
    maintenanceStatus: false,
    ownersEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 // const recordId = match.params.id;
 const { id } = useParams();

 useEffect(() => {
  fetchRecord(); // Fetch the record data when the component mounts
}, []);

const fetchRecord = async () => {
  try {
    const response = await axios.get(`http://localhost:2000/api/maintenance/recbyid/${id}`);
    const data = response.data;
    setRecord(data);
  } catch (error) {
    console.error('Error fetching record:', error);
  }
};


  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.put(`http://localhost:2000/api/maintenance/update/${id}`, record);
      console.log('Record updated successfully');
      alert('Record updated successfully');
    } catch (error) {
      console.error('Error updating record:', error);
      setError('Error updating record');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSave}>
      <Form.Group controlId="vin">
        <Form.Label>VIN</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter vehicle VIN"
          name="vin"
          value={record.vin}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="make">
        <Form.Label>Make</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter vehicle make"
          name="make"
          value={record.make}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="model">
        <Form.Label>Model</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter vehicle model"
          name="model"
          value={record.model}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="year">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter vehicle year"
          name="year"
          value={record.year}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="mileage">
        <Form.Label>Mileage</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter vehicle mileage"
          name="mileage"
          value={record.mileage}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="serviceDate">
        <Form.Label>Service Date</Form.Label>
        <Form.Control
          type="date"
          name="serviceDate"
          value={record.serviceDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="nextServiceDate">
        <Form.Label>Next Service Date</Form.Label>
        <Form.Control
          type="date"
          name="nextServiceDate"
          value={record.nextServiceDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="licensePlate">
        <Form.Label>License Plate</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter license plate"
          name="licensePlate"
          value={record.licensePlate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="maintenanceStatus">
        <Form.Check
          type="checkbox"
          label="Is maintenance required?"
          name="maintenanceStatus"
          checked={record.maintenanceStatus}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className='my-2' controlId='ownersEmail'>
            <Form.Label>Owner's Email</Form.Label>
            <Form.Control type='email' placeholder='Enter owners email' name="ownersEmail" value={record.ownersEmail} onChange={handleChange} ></Form.Control>
        </Form.Group>
      <Button type="submit" variant="primary" className="mt-3">
        Save Changes
      </Button>
      {loading && <div className="loader-container">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
    </Form>
  );
};

export default EditMaintenanceRecord;
