import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EditSparePartRecord = ({ match }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [discount, setDiscount] = useState('');
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const recordId = match.params.id;

  useEffect(() => {
    fetchRecord(); // Fetch the record data when the component mounts
  }, []);

  const fetchRecord = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/api/spare/${recordId}`);
      const data = response.data;
      setName(data.name);
      setPrice(data.price);
      setStock(data.stock);
      setDiscount(data.discount);
      setAvailable(data.available);
    } catch (error) {
      console.error('Error fetching record:', error);
    }
  };

  const validateForm = () => {
    let isValid = true;
    setError(''); // Reset error message

    // Validate name
    if (name.trim() === '') {
      setError('Name is required');
      isValid = false;
    }

    // Validate price
    if (isNaN(price) || price <= 0) {
      setError('Price must be a valid number greater than 0');
      isValid = false;
    }

    // Validate stock
    if (isNaN(stock) || stock < 0) {
      setError('Stock must be a valid number greater than or equal to 0');
      isValid = false;
    }

    // Validate discount
    if (isNaN(discount) || discount < 0 || discount > 100) {
      setError('Discount must be a valid number between 0 and 100');
      isValid = false;
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.put(`http://localhost:2000/api/spare/update/${recordId}`, {
        name,
        price,
        stock,
        discount,
        available,
      });
      console.log('Record updated successfully');
      alert('Record updated successfully');
    } catch (error) {
      console.error('Error updating record:', error);
      setError('Error updating record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="stock">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="discount">
        <Form.Label>Discount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="available">
        <Form.Check
          type="checkbox"
          label="Available"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleSave} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </Button>
      {error && <div className="error-message">{error}</div>}
    </Form>
  );
};

export default EditSparePartRecord;
