import React, { useEffect, useState } from 'react';
import './editbooking.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditBooking = () => {
    const defaultPrices = {
        "E-Car": 5000,
        "E-Van": 7000,
        "E-Bike": 2000,
        "E-Tuktuk": 4000
    };

    const { id } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState({
        vehicle: "",
        category: "",
        model: "",
        reserve_date: "",
        duration: "",
        total_price: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/getonebooking/${id}`);
                const fetchedBooking = response.data;

                // Update the booking state with fetched data
                setBooking({
                    ...fetchedBooking,
                    reserve_date: formatDateForInput(fetchedBooking.reserve_date),
                    total_price: defaultPrices[fetchedBooking.category] * fetchedBooking.duration
                });
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchData(); // Fetch data when the component mounts
    }, [id]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ""; // Return empty string if dateString is null or undefined

        const date = new Date(dateString);
        const formattedDate = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
        return formattedDate;
    };

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        let totalPrice = booking.total_price;

        if (name === "category") {
            totalPrice = defaultPrices[value] * booking.duration;
        } else if (name === "duration") {
            totalPrice = defaultPrices[booking.category] * parseInt(value);
        }

        setBooking({ ...booking, [name]: value, total_price: totalPrice });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/api/updatebooking/${id}`, booking);
            toast.success(response.data.msg, { position: "top-center", className: "alert" });
            navigate("/booking");
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    return (
        <div className='addUser'>
            <Link to="/booking" className='backHome'>Back to Home</Link>
            <h3>Update Booking</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="vehicle">Vehicle</label>
                    <input type="text" value={booking.vehicle} onChange={inputChangeHandler} name="vehicle" id="vehicle" placeholder='Enter Vehicle No' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="category">Category</label>
                    <select className='inputGroup' name="category" id="category" value={booking.category} onChange={inputChangeHandler}>
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
                    <input type="model" value={booking.model} onChange={inputChangeHandler} name="model" id="model" placeholder='Enter Vehicle Model' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="reserve_date">Reserve Date</label>
                    <input type="date" value={booking.reserve_date} onChange={inputChangeHandler} name="reserve_date" id="reserve_date" />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="duration">Duration</label>
                    <input type="number" value={booking.duration} onChange={inputChangeHandler} name="duration" id="duration" placeholder='Duration' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="total_price">Total Price</label>
                    <input type="number" value={booking.total_price} readOnly />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Update Booking</button>
                </div>
            </form>
        </div>
    );
};

export default EditBooking;
