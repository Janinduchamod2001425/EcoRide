import "./addvehicle.css";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddVehicle = () => {
    const navigate = useNavigate();

    const vehicles = {
        license: "",
        category: "",
        model: "",
        status: "",
        price: 0, // Default price
    }

    const [vehicle, setVehicle] = useState(vehicles);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        // If category changes, update price
        if (name === 'category') {
            const priceMap = {
                "E-Car": 5000.00,
                "E-Van": 7000.00,
                "E-Bike": 3000.00,
                "E-Tuktuk": 4000.00
            };
            setVehicle({ ...vehicle, [name]: value, price: priceMap[value] || 0 });
        } else {
            setVehicle({ ...vehicle, [name]: value });
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/createvehicle", vehicle);
            if (response.status === 200) {
                toast.success('Vehicle added successfully', { position: "top-center", className: "alert" });
                navigate("/vehicle");
            } else {
                throw new Error('Failed to add vehicle');
            }
        } catch (error) {
            // Check if error object has response property before accessing data
            const errorMessage = error.response ? error.response.data.message : 'Failed to connect to the server';
            toast.error(errorMessage, { position: "top-center", className: "alert" });
        }
    }

    return (
        <div className='addVehicle1'>
            <Link to={"/vehicle"} className='backHome1'>Back to Home</Link>
            <h3>Add New Vehicle</h3>
            <form className='addVehicleForm1' onSubmit={submitForm}>
                <div className='inputGroup1'>
                    <label htmlFor="license">License</label>
                    <input type="text" onChange={inputHandler} name="license" id="license" placeholder='License Plate No' />
                </div>
                <div className='inputGroup1'>
                    <label htmlFor='category'>Category</label>
                    <select
                        className='inputGroup1'
                        name='category'
                        id='category'
                        value={vehicle.category}
                        onChange={inputHandler}
                        required
                    >
                        <option value='' disabled>
                            Select vehicle category
                        </option>
                        <option value='E-Car'>E-Car</option>
                        <option value='E-Van'>E-Van</option>
                        <option value='E-Bike'>E-Bike</option>
                        <option value='E-Tuktuk'>E-Tuktuk</option>
                    </select>
                </div>
                <div className='inputGroup1'>
                    <label htmlFor="model">Model</label>
                    <input type="text" onChange={inputHandler} name="model" id="model" placeholder='Model' />
                </div>
                
                <div className='inputGroup1'>
                    <label htmlFor='status'>Status</label>
                    <select
                        className='inputGroup1'
                        name='status'
                        id='status'
                        value={vehicle.status}
                        onChange={inputHandler}
                        required
                    >
                        <option value='' disabled>
                            Select Status
                        </option>
                        <option value='Available'>Available</option>
                        <option value='Not Available'>Not Available</option>
                        <option value='Rented'>Rented</option>
                    </select>
                </div>
                <div className='inputGroup1'>
                    <label htmlFor='price'>Price</label>
                    <input type='text' name='price' id='price' value={vehicle.price} readOnly />
                </div>

                <div className='inputGroup1'>
                    <button type='submit'>Add Vehicle</button>
                </div>
            </form>
        </div>
    )
}

export default AddVehicle;