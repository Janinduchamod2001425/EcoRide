import React, { useEffect, useState } from 'react';
import './booking.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getallbookings');
        setBookings(response.data);
        setFilteredBookings(response.data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };
    fetchData();
  }, []);

  const deleteBooking = async (bookingId) => {
    try {
      const confirmDeletion = window.confirm('Are you sure you want to remove this Booking?');
      if (!confirmDeletion) return;

      const response = await axios.delete(`http://localhost:8000/api/deletebooking/${bookingId}`);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
      setFilteredBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
      toast.success(response.data.msg, { position: 'top-center', className: 'alert' });
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = bookings.filter((booking) => {
      const { vehicle, category, model, reserve_date, duration, total_price } = booking;
      return (
        vehicle.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query) ||
        model.toLowerCase().includes(query) ||
        reserve_date.toLowerCase().includes(query) ||
        duration.toString().includes(query) ||
        total_price.toString().includes(query)
      );
    });

    setFilteredBookings(filtered);
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
    ['Vehicle', 'Category', 'Model', 'Reserve_Date', 'Duration', 'Total_Price'],
    ...filteredBookings.map((booking) => [
      booking.vehicle,
      booking.category,
      booking.model,
      booking.reserve_date,
      booking.duration,
      booking.total_price,
    ]),
  ];

  return (
    <div className="userTable">
      <h2 className="headingTitle">Reservation Management Dashboard</h2>
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
        <Link to={"/addbooking"} className='addButton'>Add New Booking</Link>
        <CSVLink data={csvData} filename="EcoRide_reservationReport.csv" className="downloadButton">
          Download Report
        </CSVLink>
      </div>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Booking No</th>
            <th>Vehicle No</th>
            <th>Category</th>
            <th>Model</th>
            <th>Reserved Date & Time</th>
            <th>Duration</th>
            <th>Amount(Rs)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking, index) => (
            <tr key={booking._id}>
              <td>{index + 1}</td>
              <td>{booking.vehicle}</td>
              <td>{booking.category}</td>
              <td>{booking.model}</td>
              <td>{formatDate(booking.reserve_date)}</td>
              <td>{booking.duration}</td>
              <td>{booking.total_price}</td>
              <td className="actionButtons">
                <button onClick={() => deleteBooking(booking._id)}>Delete</button>
                <Link to={`/editbooking/` + booking._id}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
