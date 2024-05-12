import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewMaintenanceRecord = () => {
  const [vin, setVin] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [nextServiceDate, setNextServiceDate] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [maintenanceStatus, setMaintenanceStatus] = useState(false);
  const [ownersEmail, setOwnersEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!vin.trim()) {
      errors.vin = 'VIN is required';
      isValid = false;
    }

    if (!make.trim()) {
      errors.make = 'Make is required';
      isValid = false;
    }

    if (!model.trim()) {
      errors.model = 'Model is required';
      isValid = false;
    }

    if (isNaN(parseInt(year))) {
      errors.year = 'Year must be a valid number';
      isValid = false;
    }

    if (isNaN(parseInt(mileage))) {
      errors.mileage = 'Mileage must be a valid number';
      isValid = false;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(serviceDate)) {
      errors.serviceDate = 'Service Date must be in YYYY-MM-DD format';
      isValid = false;
    } else {
      const currentDate = new Date();
      const selectedServiceDate = new Date(serviceDate);
      if (selectedServiceDate <= currentDate) {
        errors.serviceDate = 'Service Date must be a future date';
        isValid = false;
      }
    }
  
    if (!/^\d{4}-\d{2}-\d{2}$/.test(nextServiceDate)) {
      errors.nextServiceDate = 'Next Service Date must be in YYYY-MM-DD format';
      isValid = false;
    } else {
      const selectedNextServiceDate = new Date(nextServiceDate);
      const currentDate = new Date();
      if (selectedNextServiceDate <= currentDate) {
        errors.nextServiceDate = 'Next Service Date must be a future date';
        isValid = false;
      } else if (selectedNextServiceDate <= new Date(serviceDate)) {
        errors.nextServiceDate = 'Next Service Date must be after Service Date';
        isValid = false;
      }
    }  

    if (!licensePlate.trim()) {
      errors.licensePlate = 'License Plate is required';
      isValid = false;
    }

    if (!ownersEmail.trim()) {
      errors.ownersEmail = "Owner's Email is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:2000/api/maintenance/create', {
        vin,
        make,
        model,
        year,
        mileage,
        serviceDate,
        nextServiceDate,
        licensePlate,
        maintenanceStatus,
        ownersEmail,
      });
      console.log('Record created successfully:', response.data);
      alert('Record created successfully');
    } catch (error) {
      setError('Error creating record: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="vin">
        <Form.Label>VIN</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter vehicle VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          isInvalid={!!validationErrors.vin}
        />
        <Form.Control.Feedback type="invalid">{validationErrors.vin}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="make">
        <Form.Label>Make</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter vehicle make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          isInvalid={!!validationErrors.make}
        />
        <Form.Control.Feedback type="invalid">{validationErrors.make}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="model">
        <Form.Label>Model</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter vehicle model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          isInvalid={!!validationErrors.model}
        />
        <Form.Control.Feedback type="invalid">{validationErrors.model}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="year">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter vehicle year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          isInvalid={!!validationErrors.year}
        />
        <Form.Control.Feedback type="invalid">{validationErrors.year}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="mileage">
        <Form.Label>Mileage</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter vehicle mileage"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          isInvalid={!!validationErrors.mileage}
        />
        <Form.Control.Feedback type="invalid">{validationErrors.mileage}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="serviceDate">
        <Form.Label>Service Date</Form.Label>
        <Form.Control
          type="date"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
          isInvalid={!!validationErrors.serviceDate}
        />
        <Form.Control.Feedback type="invalid">{validationErrors.serviceDate}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="nextServiceDate">
        <Form.Label>Next Service Date</Form.Label>
        <Form.Control
          type="date"
          value={nextServiceDate}
          onChange={(e) => setNextServiceDate(e.target.value)}
          isInvalid={!!validationErrors.nextServiceDate}
        />
        <Form.Control.Feedback type="invalid">{validationErrors.nextServiceDate}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="licensePlate">
        <Form.Label>License Plate</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter license plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          isInvalid={!!validationErrors.licensePlate}
        />
        <Form.Control.Feedback type="invalid">{validationErrors.licensePlate}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="maintenanceStatus">
        <Form.Label>Maintenance Status</Form.Label>
        <Form.Check
          type="checkbox"
          label="Is maintenance required?"
          checked={maintenanceStatus}
          onChange={(e) => setMaintenanceStatus(e.target.checked)}
        />
      </Form.Group>

      <Form.Group className='my-2' controlId='ownersEmail'>
            <Form.Label>Owner's Email</Form.Label>
            <Form.Control type='email' placeholder='Enter owners email' value={ownersEmail} onChange={(e) => setOwnersEmail(e.target.value)} ></Form.Control>
        </Form.Group>
      <Button type="submit" variant="success" className="mt-3">
        Create New Record
      </Button>
      {loading && <div className="loader-container">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
    </Form>
  );
};
export default NewMaintenanceRecord;