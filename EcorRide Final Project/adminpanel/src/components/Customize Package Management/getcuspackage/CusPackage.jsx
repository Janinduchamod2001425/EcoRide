import React, { useEffect, useState } from 'react';
import './cuspackage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';

const CusPackage = () => {
    const [cuspackages, setCusPackages] = useState([]);
    const [filteredCusPackages, setFilteredCusPackages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getallcuspacks');
                setCusPackages(response.data);
                setFilteredCusPackages(response.data);
            } catch (error) {
                console.error('Error fetching cus package data:', error);
            }
        };
        fetchData();
    }, []);

    const deleteCusPackage = async (cuspackageId) => {
        try {
            const confirmDeletion = window.confirm('Are you sure you want to remove this Customize Package?');
            if (!confirmDeletion) return;

            const response = await axios.delete(`http://localhost:8000/api/deletecuspack/${cuspackageId}`);
            setCusPackages((prevCusPackages) => prevCusPackages.filter((cuspack) => cuspack._id !== cuspackageId));
            setFilteredCusPackages((prevCusPackages) => prevCusPackages.filter((cuspack) => cuspack._id !== cuspackageId));
            toast.success(response.data.msg, { position: 'top-center', className: 'alert' });
        } catch (error) {
            console.error('Error deleting Customize Package:', error);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = cuspackages.filter((cuspack) => {
            const { description, require_date, category, vehicletype, model, services, color, duration, totalPrice, customerName } = cuspack;
            return (
                description.toLowerCase().includes(query) ||
                require_date.toLowerCase().includes(query) ||
                category.toString().includes(query) ||
                vehicletype.toString().includes(query) ||
                model.toString().includes(query) ||
                services.toString().includes(query) ||
                color.toString().includes(query) ||
                duration.toString().includes(query) ||
                totalPrice.toString().includes(query) ||
                customerName.toString().includes(query)
            );
        });

        setFilteredCusPackages(filtered);
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
        ['Description', 'Require Date', 'Category', 'Vehicle Type', 'Model', 'Services', 'Color', 'Duration', 'Total Price'],
        ...filteredCusPackages.map((cuspack) => [
            cuspack.customerName,
            cuspack.description,
            cuspack.require_date,
            cuspack.category,
            cuspack.vehicletype,
            cuspack.model,
            cuspack.services,
            cuspack.color,
            cuspack.duration,
            cuspack.totalPrice,
        ]),
    ];

    return (
        <div className="cuspackTable">
            <h2 className="headingTitle">Customize Package Dashboard</h2>
            <div className="search-bar">
                <input
                    className="searchBox"
                    type="text"
                    placeholder="🔎 Search customize packages"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="buttons-container">
                <Link to="/home" className="homeButton">
                    Back To Home
                </Link>
                <Link to={"/package"} className='addButton'>Default Packages</Link>
                <CSVLink data={csvData} filename="EcoRide_reservationReport.csv" className="downloadButton">
                    Download Report
                </CSVLink>
            </div>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Description</th>
                        <th>Require Date</th>
                        <th>Category</th>
                        <th>Vehicle Type</th>
                        <th>Model</th>
                        <th>Services</th>
                        <th>Color</th>
                        <th>Duration</th>
                        <th>Total Price(Rs)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCusPackages.map((cuspack, index) => (
                        <tr key={cuspack._id}>
                            <td>{cuspack.customerName}</td>
                            <td>{cuspack.description}</td>
                            <td>{formatDate(cuspack.require_date)}</td>
                            <td>{cuspack.category}</td>
                            <td>{cuspack.vehicletype}</td>
                            <td>{cuspack.model}</td>
                            <td>{cuspack.services}</td>
                            <td>{cuspack.color}</td>
                            <td>{cuspack.duration}</td>
                            <td>{cuspack.totalPrice}</td>
                            <td className="actionButtons">
                                <button onClick={() => deleteCusPackage(cuspack._id)}>Delete</button>
                                <Link to={`/editcuspackage/` + cuspack._id}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CusPackage;
