import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SparePartsScreen = () => {
  const [spareParts, setSpareParts] = useState([]);

  useEffect(() => {
    // Fetch spare parts from the API
    axios.get('http://localhost:2000/api/spare/all')
      .then(response => {
        setSpareParts(response.data);
      })
      .catch(error => {
        console.error('Error fetching spare parts:', error);
      });
  }, []);

  const handleEdit = (id) => {
    // Redirect to the edit spare parts page with the ID parameter
    window.location.href = `http://localhost:4000/update/${id}`;
  };

  const handleStock = async (id) => {
    try {
      await axios.put(`http://localhost:2000/api/spare/reduce-stock/${id}`);
      // Refresh the spare parts after deletion
      const updatedParts = spareParts.filter((record) => record.id !== id);
      setSpareParts(updatedParts);
      console.log('Stock Updated successfully');
      alert('Stock Updated successfully');
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error deleting part:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.put(`http://localhost:2000/api/spare/delete/${id}`);
      // Refresh the spare parts after deletion
      const updatedParts = spareParts.filter(part => part.id !== id);
      setSpareParts(updatedParts);
      console.log('Part deleted successfully');
      alert('Part deleted successfully');
    } catch (error) {
      console.error('Error deleting part:', error);
    }
  };

  return (
    <div>
      <h1>Spare Parts Management</h1>
      <Link to="/create" style={{ marginBottom: '20px' }}> {/* Updated link to direct to newSpare.jsx */}
        <Button variant="primary">Create New Spare Part</Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Stock</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {spareParts.map(part => (
            <tr key={part.id}>
              <td>{part.name}</td>
              <td>{part.price}</td>
              <td>{part.discount}</td>
              <td>{part.stock}</td>
              <td>{part.available ? 'Available' : 'Not Available'}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(part.id)}>Edit</Button>
                <Button variant="success" onClick={() => handleStock(part.id)}>Use Stock</Button>
                <Button variant="danger" onClick={() => handleDelete(part.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SparePartsScreen;
