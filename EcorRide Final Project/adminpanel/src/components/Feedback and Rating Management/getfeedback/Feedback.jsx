import React, { useEffect, useState } from 'react';
import './feedback.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getallfeedbacks');
                setFeedbacks(response.data);
                setFilteredFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedback data:', error);
            }
        };
        fetchData();
    }, []);

    const deleteFeedback = async (feedbackId) => {
        try {
            const confirmDeletion = window.confirm('Are you sure you want to remove this Feedback?');
            if (!confirmDeletion) return;

            const response = await axios.delete(`http://localhost:8000/api/deletefeedback/${feedbackId}`);
            setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== feedbackId));
            setFilteredFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== feedbackId));
            toast.success(response.data.msg, { position: 'top-center', className: 'alert' });
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = feedbacks.filter((feedback) => {
            return Object.values(feedback).some((value) =>
                value.toString().toLowerCase().includes(query)
            );
        });

        setFilteredFeedbacks(filtered);
    };

    const csvData = [
        ['User Name', 'Age', 'Gender', 'District', 'Preferred_Package', 'site_usage_frequency', 'eco_ride_suggestions', 'find_web', 'like_post', 'star_rating', 'comment'],
        ...filteredFeedbacks.map((feedback) => [
            feedback.customerName,
            feedback.age,
            feedback.gender,
            feedback.district,
            feedback.preferred_package,
            feedback.usage,
            feedback.suggestion,
            feedback.find,
            feedback.type,
            feedback.comment,
            feedback.rating
        ]),
    ];

    return (
        <div className="feedbackTable">
            <h2 className="headingTitle">Feedback Management Dashboard</h2>
            <div className="search-bar">
                <input
                    className="searchBox"
                    type="text"
                    placeholder="🔎 Search feedback"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="buttons-container">
                <Link to="/home" className="homeButton">
                    Back To Home
                </Link>
                <Link to={"/cusfeedback"} className='addButton'>Change Feedback</Link>
                <CSVLink data={csvData} filename="EcoRide_reservationReport.csv" className="downloadButton">
                    Download Report
                </CSVLink>
            </div>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>District</th>
                        <th>Preferred Package</th>
                        <th>Site Usage</th>
                        <th>Suggestions</th>
                        <th>find By</th>
                        <th>Like Post</th>
                        <th>Star Rating</th>
                        <th>Comment</th>
                        <th>Change</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFeedbacks.map((feedback) => (
                        <tr key={feedback._id}>
                            <td>{feedback.customerName}</td>
                            <td>{feedback.age}</td>
                            <td>{feedback.gender}</td>
                            <td>{feedback.district}</td>
                            <td>{feedback.preferred_package}</td>
                            <td>{feedback.usage}</td>
                            <td>{feedback.suggestion}</td>
                            <td>{feedback.find}</td>
                            <td>{feedback.type}</td>
                            <td>{feedback.comment}</td>
                            <td>{feedback.rating}</td>
                            <td className="actionButtons">
                                <Link to={`/editfeedback/` + feedback._id}>Edit</Link>
                            </td>
                            <td className="actionButtons">
                                <button onClick={() => deleteFeedback(feedback._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Feedback;
