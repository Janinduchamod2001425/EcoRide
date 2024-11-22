import React, { useState } from 'react';
import './addfeedback.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddBooking = () => {
    const navigate = useNavigate();

    // Default prices for each category
    const defaultPrices = {
        "E-Car": 5000,
        "E-Van": 7000,
        "E-Bike": 2000,
        "E-Tuktuk": 4000
    };

    // Initial booking state with default values
    const [booking, setBooking] = useState({
        vehicle: "",
        category: "",
        model: "",
        reserve_date: "",
        duration: "",
        total_price: 0 // Start with 0 for initial display
    });

    // Function to handle form input changes
    const inputHandler = (e) => {
        const { name, value } = e.target;
        let totalPrice = booking.total_price;

        if (name === "category") {
            // Update total price based on the selected category
            totalPrice = defaultPrices[value] || 0;
        } else if (name === "duration") {
            // Update total price based on duration if available
            const duration = parseInt(value) || 0;
            totalPrice = (defaultPrices[booking.category] || 0) * duration;
        }

        // Update the booking state with the new values
        setBooking({ ...booking, [name]: value, total_price: totalPrice });
    };

    // Function to submit the form data
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/createbooking", booking);
            toast.success(response.data.msg, { position: "top-center", className: "alert" });
            navigate("/booking");
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div className='addUser'>
            <Link to={"/"} className='backHome'>Back to Home</Link>
            <h3>Add New Booking</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="vehicle">Vehicle</label>
                    <input type="text" onChange={inputHandler} name="vehicle" id="vehicle" placeholder='Enter Vehicle No' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="category">Category</label>
                    <select className='inputGroup' name="category" id="category" value={booking.category} onChange={inputHandler}>
                        <option value="" disabled>Select Category</option>
                        <option value="E-Car">E-Car</option>
                        <option value="E-Van">E-Van</option>
                        <option value="E-Bike">E-Bike</option>
                        <option value="E-Tuktuk">E-Tuktuk</option>
                    </select>
                </div>
                <br />
                <div className='inputGroup'>
                    <label htmlFor="model">Model</label>
                    <input type="model" onChange={inputHandler} name="model" id="model" placeholder='Enter Vehicle Model' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="reserve_date">Reserve Date</label>
                    <input type="date" onChange={inputHandler} name="reserve_date" id="reserve_date" />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="duration">Duration</label>
                    <input type="number" onChange={inputHandler} name="duration" id="duration" placeholder='Duration' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="total_price">Total Price</label>
                    <input type="number" value={booking.total_price} readOnly />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Add Booking</button>
                </div>
            </form>
        </div>
    );
};

export default AddBooking;
