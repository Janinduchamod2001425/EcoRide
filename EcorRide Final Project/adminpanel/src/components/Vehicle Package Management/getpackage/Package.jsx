import React, { useEffect, useState } from 'react';
import './package.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getallpacks');
        setPackages(response.data);
        setFilteredPackages(response.data);
      } catch (error) {
        console.error('Error fetching package data:', error);
      }
    };
    fetchData();
  }, []);

  const deletePackage = async (packageId) => {
    try {
      const confirmDeletion = window.confirm('Are you sure you want to remove this Package?');
      if (!confirmDeletion) return;

      const response = await axios.delete(`http://localhost:8000/api/deletepack/${packageId}`);
      setPackages((prevPackages) => prevPackages.filter((pack) => pack._id !== packageId));
      setFilteredPackages((prevPackages) => prevPackages.filter((pack) => pack._id !== packageId));
      toast.success(response.data.msg, { position: 'top-center', className: 'alert' });
    } catch (error) {
      console.error('Error deleting Package:', error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = packages.filter((pack) => {
      const { packname, description, vehicletype, duration, price } = pack;
      return (
        packname.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        vehicletype.toLowerCase().includes(query) ||
        duration.toString().includes(query) ||
        price.toString().includes(query)
      );
    });

    setFilteredPackages(filtered);
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
    ['Package Name', 'Description', 'Vehicle Type', 'Duration', 'Price'],
    ...filteredPackages.map((pack) => [
        pack.packname,
        pack.description,
        pack.vehicletype,
        pack.duration,
        pack.price,
    ]),
  ];

  return (
    <div className="userTable">
      <h2 className="headingTitle">Default Package Dashboard</h2>
      <div className="search-bar">
        <input
          className="searchBox"
          type="text"
          placeholder="🔎 Search packages"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="buttons-container">
        <Link to="/home" className="homeButton">
          Back To Home
        </Link>
        <Link to={"/addpackage"} className='addButton'>Add New Package</Link>
        <Link to={"/cuspackage"} className='addButton'>Customize Packages</Link>
        <CSVLink data={csvData} filename="EcoRide_reservationReport.csv" className="downloadButton">
          Download Report
        </CSVLink>
      </div>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Description</th>
            <th>Vehicle Type</th>
            <th>Duration</th>
            <th>Duration</th>
            <th>Price(Rs)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPackages.map((pack, index) => (
            <tr key={pack._id}>
              <td>{index + 1}</td>
              <td>{pack.packname}</td>
              <td>{pack.description}</td>
              <td>{pack.vehicletype}</td>
              <td>{pack.duration}</td>
              <td>{pack.price}</td>
              <td className="actionButtons">
                <button onClick={() => deletePackage(pack._id)}>Delete</button>
                <Link to={`/editpackage/` + pack._id}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Package;
