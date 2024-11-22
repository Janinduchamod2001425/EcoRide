import React, { useEffect, useState } from 'react';
import './loyalty.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';

const Loyalty = () => {
  const [loyalty, setLoyalty] = useState([]);
  const [filteredLoyalty, setFilteredLoyalty] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getallloyalty');
        setLoyalty(response.data);
        setFilteredLoyalty(response.data);
      } catch (error) {
        console.error('Error fetching Loyalty data:', error);
      }
    };
    fetchData();
  }, []);

  const deleteLoyalty = async (loyaltyId) => {
    try {
      const confirmDeletion = window.confirm('Are you sure you want to remove this Loyalty?');
      if (!confirmDeletion) return;

      const response = await axios.delete(`http://localhost:8000/api/deleteloyalty/${loyaltyId}`);
      setLoyalty((prevLoyalty) => prevLoyalty.filter((loyalty) => loyalty._id !== loyaltyId));
      setFilteredLoyalty((prevLoyalty) => prevLoyalty.filter((loyalty) => loyalty._id !== loyaltyId));
      toast.success(response.data.msg, { position: 'top-center', className: 'alert' });
    } catch (error) {
      console.error('Error deleting loyalty:', error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = loyalty.filter((loyalty) => {
        return Object.values(loyalty).some((value) =>
            value.toString().toLowerCase().includes(query)
        );
    });

    setFilteredLoyalty(filtered);
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
    ['Name', 'Email', 'Phone', 'Birth Date', 'Points'],
    ...filteredLoyalty.map((loyalty) => [
      loyalty.name,
      loyalty.email,
      loyalty.phone,
      loyalty.birthdate,
      loyalty.points,
    ]),
  ];

  return (
    <div className="loyaltyTable">
      <h2 className="headingTitle">Loyalty Management Dashboard</h2>
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
        <CSVLink data={csvData} filename="EcoRide_loyaltyReport.csv" className="downloadButton">
          Download Report
        </CSVLink>
      </div>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Birth Date</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoyalty.map((loyalty) => (
            <tr key={loyalty._id}>
              <td>{loyalty.name}</td>
              <td>{loyalty.email}</td>
              <td>{loyalty.phone}</td>
              <td>{formatDate(loyalty.birthdate)}</td>
              <td>{loyalty.points}</td>
              <td className="actionButtons">
                <button onClick={() => deleteLoyalty(loyalty._id)}>Delete</button>
                <Link to={`/editloyalty/` + loyalty._id}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Loyalty;
