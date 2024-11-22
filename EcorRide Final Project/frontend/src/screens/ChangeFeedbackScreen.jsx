import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { submitFeedback } from '../slices/feedSlice';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useUpdateFeedbackMutation, useDeleteFeedbackMutation } from '../slices/feedbackApiSlice';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../styles/Profile.css';
import '../styles/ProfileDarkMode.css';
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

import searchIcon from '../images/home/search.png';
import signUpImage from '../images/Register/Sign Up Image.png'

const ChangeFeedbackScreen = () => {

  // Delete confimation Model
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handleCloseModal = () => setShowConfirmModal(false);
  const handleShowModal = () => setShowConfirmModal(true);

  const { feedbackId } = useParams();
  const history = useHistory();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [rating, setRating] = useState(0);

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { feedInfo } = useSelector((state) => state.feedback);

  const [updateFeedback, { isLoading }] = useUpdateFeedbackMutation();

  useEffect(() => {
    const fetchFeedbackDetails = async () => {
      try {
        // Fetch feedback details by ID if not already fetched
        if (feedbackId && feedInfo._id !== feedbackId) {
          const response = await fetchFeedbackById(feedbackId); // Implement fetchFeedbackById function
          // Assuming the response contains feedback details
          setDescription(response.description);
          setDate(response.date);
          setRating(response.rating);
        }
      } catch (error) {
        // Handle error if any
        console.error('Error fetching feedback details:', error);
      }
    };

    fetchFeedbackDetails(); // Call the function to fetch feedback details

    // Cleanup function
    return () => {
      // Perform cleanup if needed
    };
  }, [feedbackId, feedInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateFeedback({
        _id: feedInfo._id,
        description,
        date,
        rating,
      }).unwrap();
      dispatch(submitFeedback({ ...res }));
      toast.success('Feedback Updated', {
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


  // Delete account
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const handleDeleteFeedback = async () => {
    try {
      await deleteFeedback(feedInfo._id).unwrap();

      toast.success('Feedback Deleted Successfully', {
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
      console.error('Error deleting user:', err);
      toast.error(err?.data?.message || 'Failed to delete account');
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

  return (
    <div className='py-5'>

      <div className='searchbar'>
        <img src={searchIcon} className="search_icon" />
      </div>

      <div className='bacgroundImage'>

        <div className='signUpForm'>
          <p className='formTitle'>Feedback / Rating</p>

          <Form onSubmit={submitHandler}>

            <Form.Group className='set my-2' controlId='description'>
              <Form.Label className="labelName fw-bold">Description</Form.Label>
              <Form.Control className="textview" type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group className='set my-2' controlId='date'>
              <Form.Label className="labelName fw-bold">Date</Form.Label>
              <Form.Control className="textview" type='date' value={date} onChange={(e) => setDate(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group className='set my-2' controlId='rating'>
              <Form.Label className="labelName fw-bold">Rating</Form.Label>
              <Form.Control className="textview" type='number' placeholder='Enter rating' value={rating} onChange={(e) => setRating(e.target.value)} required></Form.Control>
            </Form.Group>

            {isLoading ? (
              <Loader />
            ) : (
              <Button type='submit' variant='primary' id='saveBTNReg'>Save</Button>
            )}

            <Button onClick={handleShowModal}>
              Remove Account
            </Button>

            {/* Delete Account confirmation Box */}
            <Modal className='confirmModel' show={showConfirmModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title className='modalTitle'>Confirm feedback remove</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p className='confirmationMessage'>Are you sure you want to deactivate this feedback?</p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteFeedback}>
                  Deactivate
                </Button>
              </Modal.Footer>
            </Modal>


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
              <NavLink to='/dashboard' activeClassName='active-link' id='link'>
                <img src={Image1} id='image1' />&nbsp;&nbsp; Dashboard
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/allvehicles'>
            <li>
              <NavLink to='/allvehicles' activeClassName='active-link' id='link'>
                <img src={Image2} id='image1' />&nbsp;&nbsp; E-Vehicles
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/packages'>
            <li>
              <NavLink to='/packages' activeClassName='active-link' id='link'>
                <img src={Image3} id='image1' />&nbsp;&nbsp; Packages
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/payment'>
            <li>
              <NavLink to='/payment' activeClassName='active-link' id='link'>
                <img src={Image4} id='image1' />&nbsp;&nbsp; Reservation
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/maintenance'>
            <li>
              <NavLink to='/maintenance' activeClassName='active-link' id='link'>
                <img src={Image5} id='image1' />&nbsp;&nbsp; Maintenace
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/incident'>
            <li>
              <NavLink to='/incident' activeClassName='active-link' id='link'>
                <img src={Image6} id='image1' />&nbsp;&nbsp; Incidents
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/feedback'>
            <li>
              <NavLink to='/feedback' activeClassName='active-link' id='link'>
                <img src={Image7} id='image1' />&nbsp;&nbsp; Feedback
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/loyalty'>
            <li>
              <NavLink to='/loyalty' activeClassName='active-link' id='link'>
                <img src={Image8} id='image1' />&nbsp;&nbsp; Loyalty Points
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/delete' onClick={logoutHandler}>
            <li>
              <NavLink to='/delete' activeClassName='active-link' id='link'>
                <img src={Image9} id='image1' />&nbsp;&nbsp; Remove Account
              </NavLink>
            </li>
          </LinkContainer>
        </ul>
      </div>

    </div>
  )
}

export default ChangeFeedbackScreen