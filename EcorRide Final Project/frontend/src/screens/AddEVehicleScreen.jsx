import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from 'react-bootstrap';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import '../styles/Vehicles.css';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useNewvehicleMutation } from '../slices/vehicleApiSlice';
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

import car from '../images/vehicle/carowner.png'
import tuktuk from '../images/vehicle/tukowner.png'
import bike from '../images/vehicle/bikeowner.png'
import van from '../images/vehicle/vanowner.png'

const EVehicleScreen = () => {

  const [license, setLicense] = useState('');
  const [category, setCategory] = useState('');
  const [model, setModel] = useState('');
  const [status, setStatus] = useState('Available');
  const [price, setPrice] = useState(0);

  const [add, { isLoading }] = useNewvehicleMutation();

  const categories = ["E-Car", "E-Van", "E-Bike", "E-Tuktuk"];

  const priceMap = {
    "E-Car": 5000.00,
    "E-Van": 7000.00,
    "E-Bike": 3000.00,
    "E-Tuktuk": 4000.00
  }

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await add({ license, category, model, status, price }).unwrap();
      // dispatch(setCredentials({ ...res }));
      toast.success('Vehicle Adding Successfuly', {
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
  }

  // price 
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);

    if (priceMap[selectedCategory]) {
      setPrice(priceMap[selectedCategory]);
    } else {
      setPrice(0.00);
    }
  };

  const formatPrice = (price) => {
    return price.toFixed(2);
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

  return (
    <div className='py-5'>

      <div className='searchbar'>
        <img src={searchIcon} className="search_icon" />
      </div>

      <div className='bacgroundImageVehi'>

        <div className='signUpBG'>
          <img src={car} className="addVehiImage" />
          <img src={tuktuk} className="addVehiImage" />
          <img src={van} className="addVehiImage" />
          <img src={bike} className="addVehiImage" />
        </div>

        <div className='addVehiForm'>
          <p className='formVehiTitle'>Add New Vehicle</p>

          <Form onSubmit={submitHandler}>

            <Form.Group className='set my-2' controlId='license'>
              <Form.Label className="labelNameVehi fw-bold">License Plate No</Form.Label>
              <Form.Control className="textviewVehi" type='text' placeholder='Enter license plate no' value={license} onChange={(e) => setLicense(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='category'>
              <Form.Label className="labelNameVehi fw-bold">Category</Form.Label>
              <Form.Control className="textviewVehi" as='select' value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value="" disabled>Select vehicle category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className='set my-2' controlId='model'>
              <Form.Label className="labelNameVehi fw-bold">Vehicle Model</Form.Label>
              <Form.Control className="textviewVehi" type='text' placeholder='Enter vehicle model' value={model} onChange={(e) => setModel(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group className='set my-2' controlId='status'>
              <Form.Label className="labelNameVehi fw-bold">Status</Form.Label>
              <Form.Control className="textviewVehi" type='text' placeholder='Available' value='Available' required readOnly />
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label className="labelNameVehi fw-bold">Price</Form.Label>
              <Form.Control className="textviewVehi" type='number' placeholder='Price' value={formatPrice(price)} required />
            </Form.Group>

            {isLoading ? (
              <Loader />
            ) : (
              <Button type='submit' variant='primary' id='AddVehicleButton'>Add Vehicle</Button>
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
      <div className='footerVehi'>
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

export default EVehicleScreen;