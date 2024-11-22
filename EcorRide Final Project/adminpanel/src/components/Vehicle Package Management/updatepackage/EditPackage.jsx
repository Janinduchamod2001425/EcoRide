import React, { useEffect, useState } from 'react';
import './editpackage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditPackage = () => {
    const defaultPrices = {
        "E-Car": 5000,
        "E-Van": 7000,
        "E-Bike": 2000,
        "E-Tuktuk": 4000
    };

    const { id } = useParams();
    const navigate = useNavigate();

    const [pack, setPack] = useState({
        packname: "",
        description: "",
        vehicletype: "",
        duration: "",
        price: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/getonepack/${id}`);
                const fetchedPackage = response.data;

                // Update the booking state with fetched data
                const price = defaultPrices[fetchedPackage.vehicletype] * fetchedPackage.duration;
                setPack({
                    ...fetchedPackage,
                    price: price || 0
                });
            } catch (error) {
                // Check if the error has a response with a message
                if (error.response && error.response.data && error.response.data.msg) {
                    toast.error(error.response.data.msg, { position: "top-right", className: "alert" });
                }
            }
        };

        fetchData(); // Fetch data when the component mounts
    }, [id]);

    const inputChangeHandler = (e) => {
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

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/api/updatepack/${id}`, pack);
            toast.success(response.data.msg, { position: "top-center", className: "alert" });
            navigate("/package");
        } catch (error) {
            console.error('Error updating package:', error);
        }
    };

    return (
        <div className='addUser'>
            <Link to={"/package"} className='backHome'>Back to Home</Link>
            <h3>Edit Package</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="packname">Package Name</label>
                    <input type="text" onChange={inputChangeHandler} name="packname" id="packname" value={pack.packname} placeholder='Enter Package Name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="description">Description</label>
                    <input type="text" onChange={inputChangeHandler} name="description" id="description" value={pack.description} placeholder='Enter Description' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="vehicletype">Vehicle Type</label>
                    <select className='inputGroup' name="vehicletype" id="vehicletype" value={pack.vehicletype} onChange={inputChangeHandler}>
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
                    <input type="number" onChange={inputChangeHandler} value={pack.duration} name="duration" id="duration" placeholder='Duration' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="price">Total Price</label>
                    <input type="number" value={pack.price} readOnly />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Update Package</button>
                </div>
            </form>
        </div>
    );
};

export default EditPackage;
