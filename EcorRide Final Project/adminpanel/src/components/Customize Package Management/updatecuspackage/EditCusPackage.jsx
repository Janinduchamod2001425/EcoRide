import React, { useEffect, useState } from 'react';
import './editcuspackage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditBooking = () => {
    const defaultPrices = {
        "scooter": 2000,
        "bike": 7000,
        "3wheeler": 5000,
        "car": 4000
    };

    const { id } = useParams();
    const navigate = useNavigate();

    const [pack, setPack] = useState({
        description: "",
        require_date: "",
        category: "",
        vehicletype: "",
        model: "",
        services: "",
        color: "",
        duration: "",
        totalPrice: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/getonecuspack/${id}`);
                const fetchedCusPackage = response.data;

                setPack({
                    ...fetchedCusPackage,
                    require_date: formatDateForInput(fetchedCusPackage.require_date),
                    totalPrice: defaultPrices[fetchedCusPackage.vehicletype] * fetchedCusPackage.duration
                });
            } catch (error) {
                console.error('Error fetching cus pack data:', error);
            }
        };

        fetchData();
    }, [id]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ""; // Return empty string if dateString is null or undefined

        const date = new Date(dateString);
        const formattedDate = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
        return formattedDate;
    };

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        let totalPrice = pack.totalPrice;

        if (name === "vehicletype") {
            totalPrice = defaultPrices[value] * pack.duration;
        } else if (name === "duration") {
            totalPrice = defaultPrices[pack.vehicletype] * parseInt(value);
        }

        setPack({ ...pack, [name]: value, totalPrice: totalPrice });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/api/updatecuspack/${id}`, pack);
            toast.success(response.data.msg, { position: "top-center", className: "alert", width: "300px"});
            navigate("/cuspackage");
        } catch (error) {
            console.error('Error updating cus pack:', error);
        }
    };

    return (
        <div className='addUser'>
            <Link to="/cuspackage" className='backHome'>Back to Home</Link>
            <h3>Update Customize Package</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="description">Description</label>
                    <input type="text" value={pack.description} onChange={inputChangeHandler} name="description" id="description" placeholder='Enter Description' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="require_date">Require Date</label>
                    <input type="date" value={pack.require_date} onChange={inputChangeHandler} name="require_date" id="require_date" />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="category">Category</label>
                    <select className='inputGroup' name="category" id="category" value={pack.category} onChange={inputChangeHandler}>
                        <option value="" disabled>Select Category</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="luxury">Luxury</option>
                    </select>
                </div>
                <br />
                <div className='inputGroup'>
                    <label htmlFor="vehicletype">Model</label>
                    <select className='inputGroup' name="vehicletype" id="vehicletype" value={pack.vehicletype} onChange={inputChangeHandler}>
                        <option value="" disabled>Select Vehicletype</option>
                        <option value="scooter">E-Scooter</option>
                        <option value="bike">E-Bike</option>
                        <option value="3wheeler">E-Three wheeler</option>
                        <option value="car">E-Car</option>
                    </select>
                </div>
                <br />
                <div className='inputGroup'>
                    <label htmlFor="category">Model</label>
                    <select className='inputGroup' name="model" id="model" value={pack.model} onChange={inputChangeHandler}>
                        <option value="" disabled>Select Model</option>
                        <option value="Tesla">Tesla</option>
                        <option value="Audi">Audi</option>
                        <option value="BMW">BMW</option>
                        <option value="SUV">SUV</option>
                        <option value="Wega">Wega</option>
                        <option value="Bajaj">Bajaj</option>
                        <option value="Xiomi">Xiomi</option>
                        <option value="Honda">Honda</option>
                    </select>
                </div>
                <br />
                <div className='inputGroup'>
                    <label htmlFor="services">Services</label>
                    <select className='inputGroup' name="services" id="services" value={pack.services} onChange={inputChangeHandler}>
                        <option value="" disabled>Select Service</option>
                        <option value="insurance">Insurance</option>
                        <option value="roadside_assistance">Roadside Assistance</option>
                        <option value="GPS">GPS</option>
                    </select>
                </div>
                <br />
                <div className='inputGroup'>
                    <label htmlFor="category">Color</label>
                    <select className='inputGroup' name="color" id="color" value={pack.color} onChange={inputChangeHandler}>
                        <option value="" disabled>Select Color</option>
                        <option value="Red">Red</option>
                        <option value="Green">Green</option>
                        <option value="Black">Black</option>
                        <option value="Blue">Blue</option>
                        <option value="White">White</option>
                    </select>
                </div>
                <br />
                <div className='inputGroup'>
                    <label htmlFor="duration">Duration</label>
                    <input type="number" value={pack.duration} onChange={inputChangeHandler} name="duration" id="duration" placeholder='Duration' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="totalPrice">Total Price</label>
                    <input type="number" value={pack.totalPrice} readOnly />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Update Booking</button>
                </div>
            </form>
        </div>
    );
};

export default EditBooking;
