import React, { useEffect, useState } from 'react';
import './maintenance.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';

const Maintenance = () => {
  const [maintenance, setMaintenance] = useState([]);
  const [filteredMaintenances, setFilteredMaintenances] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getallmaintenance');
        setMaintenance(response.data);
        setFilteredMaintenances(response.data);
      } catch (error) {
        console.error('Error fetching maintenance data:', error);
      }
    };
    fetchData();
  }, []);

  const deleteMaintenance = async (maintenanceId) => {
    try {
      const confirmDeletion = window.confirm('Are you sure you want to remove this Schedule?');
      if (!confirmDeletion) return;

      const response = await axios.delete(`http://localhost:8000/api/deletemaintenance/${maintenanceId}`);
      setMaintenance((prevMaintenance) => prevMaintenance.filter((maintenance) => maintenance._id !== maintenanceId));
      setFilteredMaintenances((prevMaintenance) => prevMaintenance.filter((maintenance) => maintenance._id !== maintenanceId));
      toast.success(response.data.msg, { position: 'top-center', className: 'alert' });
    } catch (error) {
      console.error('Error deleting maintenance:', error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = maintenance.filter((maintenance) => {
        return Object.values(maintenance).some((value) =>
            value.toString().toLowerCase().includes(query)
        );
    });

    setFilteredMaintenances(filtered);
};

  // Format date to YYYY-MM-DD HH:mm:ss
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because January is 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const csvData = [
    ['VIN', 'Make', 'Model', 'Year', 'Mileage', 'Service Date', 'Next Service Date', 'License Plate', 'Maintenance Status'],
    ...filteredMaintenances.map((maintenance) => [
      maintenance.vin,
      maintenance.make,
      maintenance.model,
      maintenance.year,
      maintenance.mileage,
      maintenance.serviceDate,
      maintenance.nextServiceDate,
      maintenance.licensePlate,
      maintenance.maintenanceStatus,
    ]),
  ];

  return (
    <div className="maintenanceTable">
      <h2 className="headingTitle">Maintenance Management Dashboard</h2>
      <div className="search-bar">
        <input
          className="searchBox"
          type="text"
          placeholder="🔎 Search bookings"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="buttons-container">
        <Link to="/home" className="homeButton">
          Back To Home
        </Link>
        <Link to={"/addmaintenance"} className='addButton'>New Maintenance</Link>
        <CSVLink data={csvData} filename="EcoRide_maintenanceReport.csv" className="downloadButton">
          Download Report
        </CSVLink>
      </div>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>VIN</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Mileage</th>
            <th>Service Date</th>
            <th>Next Service Date</th>
            <th>License Plate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMaintenances.map((maintenance) => (
            <tr key={maintenance._id}>
              <td>{maintenance.vin}</td>
              <td>{maintenance.make}</td>
              <td>{maintenance.model}</td>
              <td>{maintenance.year}</td>
              <td>{maintenance.mileage}</td>
              <td>{formatDate(maintenance.serviceDate)}</td>
              <td>{formatDate(maintenance.nextServiceDate)}</td>
              <td>{maintenance.licensePlate}</td>
              <td>{maintenance.maintenanceStatus}</td>
              <td className="actionButtons">
                <button onClick={() => deleteMaintenance(maintenance._id)}>Delete</button>
                <Link to={`/editmaintenance/` + maintenance._id}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Maintenance;
