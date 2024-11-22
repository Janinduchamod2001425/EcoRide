import React, { useEffect, useState } from 'react';
import './editfeedback.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditFeedback = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [feedback, setFeedback] = useState({
        age: 0,
        gender: "",
        district: "",
        preferred_package: "",
        usage: "",
        suggestion: "",
        find: "",
        type: "",
        comment: "",
        rating: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/getonefeedback/${id}`);
                const fetchedFeedback = response.data;

                // Update the booking state with fetched data
                setFeedback({
                    ...fetchedFeedback
                });
            } catch (error) {
                console.error('Error fetching feedback data:', error);
            }
        };

        fetchData();
    }, [id]);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;

        setFeedback({ ...feedback, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/api/updatefeedback/${id}`, feedback);
            toast.success(response.data.msg, { position: "top-center", className: "alert" });
            navigate("/feedback");
        } catch (error) {
            console.error('Error updating feedback:', error);
        }
    };

    // Function to handle star rating
    const handleRatingChange = (value) => {
        setFeedback({ ...feedback, rating: value });
    };


    return (
        <div className='addUser'>
            <Link to="/feedback" className='backHome'>Back to Home</Link>
            <h3>Update Feedback</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="age">Age</label>
                    <input type="number" value={feedback.age} onChange={inputChangeHandler} name="age" id="age" placeholder='Enter Age' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="gender">Gender</label>
                    <select className='inputGroup' name="gender" id="gender" value={feedback.gender} onChange={inputChangeHandler}>
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <br />
                <div className='inputGroup'>
                    <label htmlFor="district">District</label>
                    <select className='inputGroup' name="district" id="district" value={feedback.district} onChange={inputChangeHandler}>
                        <option value="" disabled>Select District</option>
                        <option value="Galle">Galle</option>
                        <option value="Colombo">Colombo</option>
                        <option value="Gampaha">Gampaha</option>
                        <option value="Kandy">Kandy</option>
                        <option value="Jaffna">Jaffna</option>
                        <option value="Anuradhapura">Anuradhapura</option>
                        <option value="Matara">Matara</option>
                        <option value="Nuwara Eliya">Nuwara Eliya</option>
                    </select>
                </div>
                <br />
                <div className='inputGroup'>
                    <label htmlFor="preferred_package">Preferred Package</label>
                    <select className='inputGroup' name="preferred_package" id="preferred_package" value={feedback.preferred_package} onChange={inputChangeHandler}>
                        <option value="" disabled>Select Preferred Package</option>
                        <option value="Eco Commute Package">Eco Commute Package</option>
                        <option value="Family Mobility Package">Family Mobility Package</option>
                        <option value="Adventure Seeker">Adventure Seeker</option>
                    </select>
                </div>
                <br />
                <div className='inputGroup'>
                    <label htmlFor="usage">How many times use this site?</label>
                    <input type="number" value={feedback.usage} onChange={inputChangeHandler} name="usage" id="usage" placeholder='usage' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="find">Find By</label>
                    <select className='inputGroup' name="find" id="find" value={feedback.find} onChange={inputChangeHandler}>
                        <option value="" disabled>Select Find</option>
                        <option value="Friend">Friend</option>
                        <option value="Search Engine">Search Engine</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <br />
                <div className='inputGroup'>
                    <label htmlFor="suggestion">What is your development suggestion eco ride?</label>
                    <input type="text" value={feedback.suggestion} onChange={inputChangeHandler} name="suggestion" id="suggestion" placeholder='suggestion' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="type">Like to post feedback</label>
                    <select className='inputGroup' name="type" id="type" value={feedback.type} onChange={inputChangeHandler}>
                        <option value="">Select Type</option>
                        <option value="Anonymous feedback">Anonymous feedback</option>
                        <option value="Booking process">Booking process</option>
                        <option value="Vehicle performance">Vehicle performance</option>
                        <option value="Customer support">Customer support</option>
                        <option value="Environmental impact">Environmental impact</option>
                    </select>
                </div>
                <br />
                <div className='inputGroup'>
                    <label htmlFor="comment">Comments</label>
                    <input type="text" value={feedback.comment} onChange={inputChangeHandler} name="comment" id="comment" placeholder='comment' />
                </div>

                {/* Star Rating */}
                <div className='inputGroup'>
                    <label htmlFor="type">Rating</label>
                    <select className='inputGroup' name="rating" id="rating" value={feedback.rating} onChange={inputChangeHandler}>
                        <option value="">Select Rate</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="1">⭐</option>
                    </select>
                </div>

                <div className='inputGroup'>
                    <button type='submit'>Update Feedback</button>
                </div>
            </form>
        </div>
    );
};

export default EditFeedback;
