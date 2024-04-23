import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import FormContainer from './FormContainer'; 
import { TailSpin } from 'react-loader-spinner';

import '../styles/new.css'; 

const NewMaintenance = () => {
    const [vin, setVin] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [mileage, setMileage] = useState("");
    const [serviceDate, setServiceDate] = useState("");
    const [nextServiceDate, setNextServiceDate] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [maintenanceStatus, setMaintenanceStatus] = useState(false);
    const [ownersEmail, setOwnersEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newMaintenanceRecord = {
            vin,
            make,
            model,
            year,
            mileage,
            serviceDate,
            nextServiceDate,
            licensePlate,
            maintenanceStatus,
            ownersEmail
        };
        console.log('New Maintenance Record:', newMaintenanceRecord);


        try {
            const response = await axios.post('http://localhost:2000/api/maintenance/create', newMaintenanceRecord);
            console.log('New maintenance record created:', response.data);
            // Optionally, you can redirect the user to a different page or show a success message
        } catch (error) {
            console.error('Error creating maintenance record:', error);
            setError(error.message || 'An error occurred');
        }
        finally {
            setLoading(false); // Set loading back to false after the API call is complete
        }
    };

    return (
        <FormContainer>
            <h1>New Maintenance Record</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="vin">
                    <Form.Label>VIN</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter vehicle VIN"
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='my-2' controlId='make'>
            <Form.Label>Make</Form.Label>
            <Form.Control type='text' placeholder='Enter vehicle make' value={make} onChange={(e) => setMake(e.target.value)} ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='model'>
            <Form.Label>Model</Form.Label>
            <Form.Control type='text' placeholder='Enter vehicle model' value={model} onChange={(e) => setModel(e.target.value)} ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='year'>
            <Form.Label>Year</Form.Label>
            <Form.Control type='number' placeholder='Enter vehicle year' value={year} onChange={(e) => setYear(e.target.value)} ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='mileage'>
            <Form.Label>Mileage</Form.Label>
            <Form.Control type='number' placeholder='Enter vehicle mileage' value={mileage} onChange={(e) => setMileage(e.target.value)} ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='serviceDate'>
            <Form.Label>Service Date</Form.Label>
            <Form.Control type='date' value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='nextServiceDate'>
            <Form.Label>Next Service Date</Form.Label>
            <Form.Control type='date' value={nextServiceDate} onChange={(e) => setNextServiceDate(e.target.value)} ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='licensePlate'>
            <Form.Label>License Plate</Form.Label>
            <Form.Control type='text' placeholder='Enter license plate' value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='maintenanceStatus'>
            <Form.Label>Maintenance Status</Form.Label>
            <Form.Check
                type='checkbox'
                label='Is maintenance required?'
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
    {loading && (
                       <div className="loader-container">
                        <TailSpin type="TailSpin" color="#00BFFF" height={50} width={50} />
                    </div>
                )}
            </Form>

            {error && <div className="error-message">{error}</div>}
        </FormContainer>
    );
};

export default NewMaintenance;
