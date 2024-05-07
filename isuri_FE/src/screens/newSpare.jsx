import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const CreateSparePartScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [stock, setStock] = useState('');
  const [available, setAvailable] = useState(true); // Default availability to true
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPart = { name, price, discount, stock, available };
    try {
      await axios.post('http://localhost:2000/api/spare/create', newPart);
      console.log('New part created successfully');
      alert('New part created successfully');
      // Redirect to the spare parts management screen after creation
      window.location.href = '/spare-parts';
    } catch (error) {
      console.error('Error creating new part:', error);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!price || isNaN(price) || price <= 0) {
      errors.price = 'Price must be a valid number greater than 0';
      isValid = false;
    }

    if (!stock || isNaN(stock) || stock < 0) {
      errors.stock = 'Stock must be a valid number greater than or equal to 0';
      isValid = false;
    }

    if (!discount || isNaN(discount) || discount < 0 || discount > 100) {
      errors.discount = 'Discount must be a valid number between 0 and 100';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div>
      <h1>Create New Spare Part</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter part name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            isInvalid={!!errors.discount}
          />
          <Form.Control.Feedback type="invalid">{errors.discount}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            isInvalid={!!errors.stock}
          />
          <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="available">
          <Form.Check
            type="checkbox"
            label="Available"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!validateForm()}>
          Create
        </Button>
      </Form>
    </div>
  );
}

export default CreateSparePartScreen;
