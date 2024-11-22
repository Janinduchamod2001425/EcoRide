import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import '../styles/Feedback.css';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { submitFeedback } from '../slices/feedSlice';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useAddFeedbackMutation } from "../slices/feedbackApiSlice";
import { logout } from "../slices/authSlice";

import Image1 from '../images/sidenavbar/Dashboard.png';
import Image2 from '../images/sidenavbar/EVehicle.png';
import Image3 from '../images/sidenavbar/packages.png';
import Image4 from '../images/sidenavbar/Reservation.png';
import Image5 from '../images/sidenavbar/Maintenance.png';
import Image6 from '../images/sidenavbar/Damage.png';
import Image7 from '../images/sidenavbar/feedback.png';
import Image8 from '../images/sidenavbar/Loyalty.png';
import Image9 from '../images/sidenavbar/Delete.png';

import foot from '../images/Footer image.png';
import searchIcon from '../images/home/search.png';

const FeedbackRatingScreen = () => {

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [district, setDistrict] = useState('');
  const [preferred_package, setPreferredpackage] = useState('');
  const [usage, setUsage] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const [find, setFind] = useState('');
  const [type, setType] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [add, { isLoading }] = useAddFeedbackMutation();

  const { feedInfo } = useSelector((state) => state.feedback);

  useEffect(() => {
    if (feedInfo) {
      navigate('/feedback');
    }
  }, [navigate, feedInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await add({ age, gender, district, preferred_package, usage, suggestion, find, type, comment, rating }).unwrap();
      dispatch(submitFeedback({ ...res }));
      toast.success('Feedback Added successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        style: {
          backgroundColor: "#c4f9a9",
          color: "black",
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "monospace"
        }
      });
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        style: {
          backgroundColor: "#ffd5cc",
          color: "black",
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: "monospace"
        }
      });
    }
  };

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  // Time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Date
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleDateString();

  // handle select fields
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handlePreferrefPackChange = (event) => {
    setPreferredpackage(event.target.value);
  };

  const handleFindPackChange = (event) => {
    setFind(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };


  return (
    <div className='py-5'>

      <div className='searchbar'>
        <img src={searchIcon} className="search_icon" />
      </div>

      <div className='bacgroundImageFeed'>
        <div className='feedbackTopic'>Feedback and Rating</div>
        <div className='feedform'>

          <Form className='form' onSubmit={submitHandler}>

            <div className='set1'>
              <Form.Group className='set my-2' controlId='age'>
                <Form.Label className="labelNameFeed fw-bold">Age</Form.Label>
                <Form.Control className="textviewFeed" type='number' placeholder='Enter age' value={age} onChange={(e) => setAge(e.target.value)} required></Form.Control>
              </Form.Group>

              <Form.Group className='set my-2' controlId='gender'>
                <Form.Label className="labelNameFeed fw-bold">Gender</Form.Label>
                <Form.Select className="textviewFeed" id="gender"
                  value={gender} onChange={handleGenderChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className='set1'>
              <Form.Group className='set my-2' controlId='district'>
                <Form.Label className="labelNameFeed fw-bold">District</Form.Label>
                <Form.Select className="textviewFeed" id="district"
                  value={district} onChange={handleDistrictChange}>
                  <option value="">Select District</option>
                  <option value="Galle">Galle</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Matara">Matara</option>
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className='set my-2' controlId='preferred_package'>
                <Form.Label className="labelNameFeed fw-bold">Preferred Package</Form.Label>
                <Form.Select className="textviewFeed" id="preferred_package"
                  value={preferred_package} onChange={handlePreferrefPackChange}>
                  <option value="">Select Preferred Package</option>
                  <option value="Eco Commute Package">Eco Commute Package</option>
                  <option value="Family Mobility Package">Family Mobility Package</option>
                  <option value="Adventure Seeker">Adventure Seeker</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className='set1'>
              <Form.Group className='set my-2' controlId='usage'>
                <Form.Label className="labelNameFeed fw-bold">How many times use this site?</Form.Label>
                <Form.Control className="textviewFeed" type='number' placeholder='Enter usage' value={usage} onChange={(e) => setUsage(e.target.value)} required></Form.Control>
              </Form.Group>

              <Form.Group className='set my-2' controlId='find'>
                <Form.Label className="labelNameFeed fw-bold">Find By</Form.Label>
                <Form.Select className="textviewFeed" id="find"
                  value={find} onChange={handleFindPackChange}>
                  <option value="">Select Find</option>
                  <option value="Friend">Friend</option>
                  <option value="Search Engine">Search Engine</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className='set2'>
              <br />
              <Form.Group className='set my-2' controlId='suggestion'>
                <Form.Label className="labelNameFeed fw-bold">What is your development suggestion eco ride?</Form.Label>
                <Form.Control className="textviewFeed" type='text' placeholder='Enter suggestion' value={suggestion} onChange={(e) => setSuggestion(e.target.value)} required></Form.Control>
              </Form.Group>
            </div>

            <div className='set3'>
              <Form.Group className='set my-2' controlId='type'>
                <Form.Label className="labelNameFeed fw-bold">Like to post feedback</Form.Label>
                <Form.Select className="textviewFeed" id="type"
                  value={type} onChange={handleTypeChange}>
                  <option value="">Select Type</option>
                  <option value="Anonymous feedback">Anonymous feedback</option>
                  <option value="Booking process">Booking process</option>
                  <option value="Vehicle performance">Vehicle performance</option>
                  <option value="Customer support">Customer support</option>
                  <option value="Environmental impact">Environmental impact</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className='set my-2' controlId='comment'>
                <Form.Label className="labelNameFeed fw-bold">Comment</Form.Label>
                <Form.Control className="textviewFeed" type='text' placeholder='Enter comments' value={comment} onChange={(e) => setComment(e.target.value)} required></Form.Control>
              </Form.Group>
            </div>

            <div className='set4'>
              {/* Star Rating (1-5) */}
              <Form.Group controlId='rating'>
                <Form.Label className="labelNameFeed fw-bold">Rating</Form.Label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <button
                      key={index}
                      className={`star-button ${rating >= index ? 'filled' : ''}`}
                      onClick={() => setRating(index)}
                    >
                      &#9733; {/* Unicode character for star */}
                    </button>
                  ))}
                </div>
              </Form.Group>
            </div>





            {isLoading ? (
              <Loader />
            ) : (
              <Button type='submit' variant='primary' id='updateFeedBTN'>Submit</Button>
            )}


          </Form>
        </div>

      </div>

      {/* Side Navbar */}
      <div id='side-navbar'>
        <ul>
          <div id='clock'>
            <div className='time font-monospace fs-1'>
              {currentTime}
            </div>
            <div className='date fs-4'>
              {formattedDate}
            </div>
          </div>

          <br />
          <LinkContainer to='/dashboard'>
            <li>
              <Link to='/dashboard' activeClassName='active-link' id='link'>
                <img src={Image1} id='image1' />&nbsp;&nbsp; Dashboard
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/allvehicles'>
            <li>
              <Link to='/allvehicles' activeClassName='active-link' id='link'>
                <img src={Image2} id='image1' />&nbsp;&nbsp; E-Vehicles
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/packages'>
            <li>
              <Link to='/packages' activeClassName='active-link' id='link'>
                <img src={Image3} id='image1' />&nbsp;&nbsp; Packages
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/cusbookings'>
            <li>
              <Link to='/cusbookings' activeClassName='active-link' id='link'>
                <img src={Image4} id='image1' />&nbsp;&nbsp; Reservation
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/maintenance'>
            <li>
              <Link to='/maintenance' activeClassName='active-link' id='link'>
                <img src={Image5} id='image1' />&nbsp;&nbsp; Maintenace
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/incident'>
            <li>
              <Link to='/incident' activeClassName='active-link' id='link'>
                <img src={Image6} id='image1' />&nbsp;&nbsp; Incidents
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/feedback'>
            <li>
              <Link to='/feedback' activeClassName='active-link' id='link'>
                <img src={Image7} id='image1' />&nbsp;&nbsp; Feedback
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/loyalty'>
            <li>
              <Link to='/loyalty' activeClassName='active-link' id='link'>
                <img src={Image8} id='image1' />&nbsp;&nbsp; Loyalty Points
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/logout' onClick={logoutHandler}>
            <li>
              <Link to='/logout' activeClassName='active-link' id='link'>
                <img src={Image9} id='image1' />&nbsp;&nbsp; Remove Account
              </Link>
            </li>
          </LinkContainer>
        </ul>
      </div>

      {/* Footer */}
      <div className='footerFeed'>
        <img src={foot} className="foot" />
        <div className='footlinks'>
          <h4 className='heading'>Key Features</h4>
          <a id='footlink' href="">E-Vehicles</a> <br />
          <a id='footlink' href="">E-Vehicle Packages</a> <br />
          <a id='footlink' href="">Reservations</a> <br />
          <a id='footlink' href="">Maintenance</a> <br />
          <a id='footlink' href="">Damage and Incidents</a> <br />
          <a id='footlink' href="">Feedback and Rating</a> <br />
          <a id='footlink' href="">Customer Loyalty</a> <br />
        </div>
      </div>
      <h5 className='copyright'> 2024 copyright EcoRide.com</h5>


    </div>
  )
}

export default FeedbackRatingScreen