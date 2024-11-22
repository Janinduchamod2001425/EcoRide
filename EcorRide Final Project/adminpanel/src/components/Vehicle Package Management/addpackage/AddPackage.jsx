import React, { useState } from 'react';
import './addpackage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddPackage = () => {
    const navigate = useNavigate();

    // Default prices for each category
    const defaultPrices = {
        "E-Car": 5000,
        "E-Van": 7000,
        "E-Bike": 2000,
        "E-Tuktuk": 4000
    };

    // Initial booking state with default values
    const [pack, setPack] = useState({
        packname: "",
        description: "",
        vehicletype: "",
        duration: "",
        price: 0
    });

    // Function to handle form input changes
    const inputHandler = (e) => {
        const { name, value } = e.target;
        let price = pack.price;

        if (name === "vehicletype") {
            price = defaultPrices[value] || 0;
        } else if (name === "duration") {
            const duration = parseInt(value) || 0;
            price = (defaultPrices[pack.vehicletype] || 0) * duration;
        }

        // Update the booking state with the new values
        setPack({ ...pack, [name]: value, price: price });
    };

    // Function to submit the form data
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/createpack", pack);
            toast.success(response.data.msg, { position: "top-center", className: "alert" });
            navigate("/package");
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // Extract the error message from the response data
                const errorMessage = error.response.data.error || "An error occurred while adding the package.";
                toast.error(errorMessage, { position: "top-center", className: "alert" });
            } else if (error.request) {
                // The request was made but no response was received
                toast.error("No response received from the server.", { position: "top-center", className: "alert" });
            } else {
                // Something happened in setting up the request that triggered an error
                toast.error("An error occurred while processing the request.", { position: "top-center", className: "alert" });
            }
        }
    };

    return (
        <div className='addUser'>
            <Link to={"/package"} className='backHome'>Back to Home</Link>
            <h3>Add New Package</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="packname">Package Name</label>
                    <input type="text" onChange={inputHandler} name="packname" id="packname" placeholder='Enter Package Name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="description">Description</label>
                    <input type="text" onChange={inputHandler} name="description" id="description" placeholder='Enter Description' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="vehicletype">Vehicle Type</label>
                    <select className='inputGroup' name="vehicletype" id="vehicletype" value={pack.vehicletype} onChange={inputHandler}>
                        <option value="" disabled>Select Category</option>
                        <option value="E-Car">E-Car</option>
                        <option value="E-Van">E-Van</option>
                        <option value="E-Bike">E-Bike</option>
                        <option value="E-Tuktuk">E-Tuktuk</option>
                    </select>
                </div>
                <br />
                <div className='inputGroup'>
                    <label htmlFor="duration">Duration</label>
                    <input type="number" onChange={inputHandler} name="duration" id="duration" placeholder='Duration' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="price">Total Price</label>
                    <input type="number" value={pack.price} readOnly />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Add Package</button>
                </div>
            </form>
        </div>
    );
};

export default AddPackage;
