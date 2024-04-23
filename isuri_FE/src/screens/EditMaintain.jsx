import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditMaintain = () => {
  const { id } = useParams(); // Access the id parameter from the URL
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

  useEffect(() => {
    // Fetch the specific record data using the id parameter
    axios.get(`http://localhost:2000/api/maintenance/recbyid/${id}`)
      .then(response => {
        setRecord(response.data);
      })
      .catch(error => {
        console.error('Error fetching record:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setRecord(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:2000/api/maintenance/update/${id}`, record);
      console.log('Record updated successfully');
  
      // Show success message to the user
      alert('Record updated successfully');
  
      // Optionally, you can redirect the user to another page or perform any other action
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  return (
    <div>
      <h1>Edit Maintenance Record</h1>
      <form>
        <div>
          <label>VIN</label>
          <input type="text" name="vin" value={record.vin || ''} onChange={handleChange} />
        </div>

        <div>
          <label>Make</label>
          <input type="text" name="make" value={record.make || ''} onChange={handleChange} />
        </div>

        <div>
          <label>Model</label>
          <input type="text" name="model" value={record.model || ''} onChange={handleChange} />
        </div>

        <div>
          <label>Year</label>
          <input type="number" name="year" value={record.year || ''} onChange={handleChange} />
        </div>

        <div>
          <label>Mileage</label>
          <input type="number" name="mileage" value={record.mileage || ''} onChange={handleChange} />
        </div>

        <div>
          <label>Service Date</label>
          <input type="date" name="serviceDate" value={record.serviceDate || ''} onChange={handleChange} />
        </div>

        <div>
          <label>Next Service Date</label>
          <input type="date" name="nextServiceDate" value={record.nextServiceDate || ''} onChange={handleChange} />
        </div>

        <div>
          <label>License Plate</label>
          <input type="text" name="licensePlate" value={record.licensePlate || ''} onChange={handleChange} />
        </div>

        <div>
          <label>Maintenance Status</label>
          <input type="checkbox" name="maintenanceStatus" checked={record.maintenanceStatus} onChange={handleChange} />
        </div>

        <div>
          <label>Owner's Email</label>
          <input type="email" name="ownersEmail" value={record.ownersEmail || ''} onChange={handleChange} />
        </div>

        <button type="button" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default EditMaintain;
