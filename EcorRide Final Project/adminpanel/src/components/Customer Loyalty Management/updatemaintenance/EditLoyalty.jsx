import React, { useEffect, useState } from 'react';
import './editloyalty.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditLoyalty = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();

    const [maintenance, setMaintenance] = useState({
        vin: "",
        make: "",
        model: "",
        year: "",
        mileage: 0,
        total_price: 0,
        serviceDate: '',
        nextServiceDate: '',
        licensePlate: '',
        maintenanceStatus: '',

    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/getonemaintenance/${id}`);
                const fetchedMaintenance = response.data;

                setMaintenance({
                    ...fetchedMaintenance,
                    serviceDate: formatDateForInput(fetchedMaintenance.serviceDate),
                    nextServiceDate: formatDateForInput(fetchedMaintenance.nextServiceDate),
                });
            } catch (error) {
                console.error('Error fetching maintenance data:', error);
            }
        };

        fetchData(); 
    }, [id]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ""; 

        const date = new Date(dateString);
        const formattedDate = date.toISOString().split('T')[0]; 
        return formattedDate;
    };

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;

        setMaintenance({ ...maintenance, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/api/updatemaintenance/${id}`, maintenance);
            toast.success(response.data.msg, { position: "top-center", className: "alert" });
            navigate("/maintenance");
        } catch (error) {
            console.error('Error updating maintenance:', error);
        }
    };

    return (
        <div className='addUser'>
            <Link to="/maintenance" className='backHome'>Back to Home</Link>
            <h3>Update Maintenance Schedule</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="vin">VIN</label>
                    <input type="text" value={maintenance.vin} onChange={inputChangeHandler} name="vin" id="vin" placeholder='Enter VIN' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="make">Make</label>
                    <input type="text" value={maintenance.make} onChange={inputChangeHandler} name="make" id="make" placeholder='Enter Make' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="model">Model</label>
                    <input type="text" value={maintenance.model} onChange={inputChangeHandler} name="model" id="model" placeholder='Enter Vehicle Model' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="year">Year</label>
                    <input type="number" value={maintenance.year} onChange={inputChangeHandler} name="year" id="year" placeholder='Enter Year' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="mileage">Mileage</label>
                    <input type="text" value={maintenance.mileage + ' km'} onChange={inputChangeHandler} name="mileage" id="mileage" placeholder='Enter Mileage' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="serviceDate">Service Date</label>
                    <input type="date" value={maintenance.serviceDate} onChange={inputChangeHandler} name="serviceDate" id="serviceDate" />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="nextServiceDate">Next Service Date</label>
                    <input type="date" value={maintenance.nextServiceDate} onChange={inputChangeHandler} name="nextServiceDate" id="nextServiceDate" />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="licensePlate">License Plate</label>
                    <input type="text" value={maintenance.licensePlate} onChange={inputChangeHandler} name="licensePlate" id="licensePlate" placeholder='licensePlate' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="maintenanceStatus">Maintenance Status</label>
                    <select className='inputGroup' name="maintenanceStatus" id="maintenanceStatus" value={maintenance.maintenanceStatus} onChange={inputChangeHandler}>
                        <option value="" disabled>Select status</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Update Maintenance</button>
                </div>
            </form>
        </div>
    );
};

export default EditLoyalty;
