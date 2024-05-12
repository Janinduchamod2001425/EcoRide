import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const PermissionPage = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    // const handleEmailChange = (event) => {
    //     setEmail(event.target.value);
    // };

    // const handleNameChange = (event) => {
    //     setName(event.target.value);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if email and name are provided
        if (!email || !name) {
            setMessage("Email and owner's name are required.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:2000/api/maintenance/email', {
                email,
                ownerName: name // Send 'ownerName' as expected by the backend
            });
            setMessage(response.data); // Assuming the API sends a text response
            alert('Email sent successfully');
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Error requesting permission. Please try again.');
            }
        }
    };

    return (
        <div>
        <h2>Request Permission</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>
  
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </Form.Group>
  
          <Button variant="primary" type="submit">
            Send Request
          </Button>
        </Form>
        {message && <p>{message}</p>}
      </div>
    );
};

export default PermissionPage;
