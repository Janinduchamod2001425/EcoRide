import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import '../styles/Packages.css';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useCreateMutation } from "../slices/packagesApiSlice";
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

const PackageScreen = () => {

  const [description, setDescription] = useState('');
  const [require_date, setRequiredate] = useState(null);
  const [category, setCategory] = useState('');
  const [features, setFeatures] = useState('');
  const [vehicletype, setVehicleType] = useState('');
  const [model, setModel] = useState('');
  const [services, setServices] = useState('');
  const [color, setColor] = useState('');
  const [duration, setDuration] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(10000);

  const [create, { isLoading }] = useCreateMutation();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await create({ description, require_date, category, features, vehicletype, model, services, color, duration, totalPrice }).unwrap();
      // dispatch(setCredentials({ ...res }));
      toast.success('Package Created successfuly', {
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
      navigate(`/payment?category=${category}&totalPrice=${totalPrice}`);

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

  const handleRedeemPoints = () => {
    const pointsToRedeem = 5000; // Adjust based on your logic
    const pointsDiscount = pointsToRedeem / 100; // Example: 1 point = $0.01 discount

    if (loyaltyPoints >= pointsToRedeem && totalPrice >= pointsDiscount) {
      const updatedLoyaltyPoints = loyaltyPoints - pointsToRedeem;
      const discountedPrice = totalPrice - pointsDiscount;

      setLoyaltyPoints(updatedLoyaltyPoints);
      setTotalPrice(discountedPrice.toFixed(2)); // Fix: Round the total price to 2 decimal places

      toast.success(`Successfully redeemed ${pointsToRedeem} loyalty points. New total price: LKR ${discountedPrice}`, {
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
    } else {
      toast.error('Insufficient loyalty points to redeem or total price is too low for redemption.', {
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



  //total________________________________________________

  const pricePerDay = {
    scooter: 1500,
    bike: 2000,
    '3wheeler': 3000,
    car: 5000,
  };

  const handleVehicleChange = (event) => {
    setVehicleType(event.target.value);
    calculateTotalPrice(event.target.value, duration);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleFeaturesChange = (event) => {
    setFeatures(event.target.value);
  };

  const handleServicesChange = (event) => {
    setServices(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
    calculateTotalPrice(vehicletype, event.target.value);
  };

  const calculateTotalPrice = (vehicle, days) => {
    const price = pricePerDay[vehicle] || 0;
    const total = price * days;
    setTotalPrice(total ? `${total}` : '');
  };

  return (
    <div className='py-5'>

      <div className='searchbar'>
        <img src={searchIcon} className="search_icon" />
      </div>

      <div className='bacgroundImage'>
        <div className='packageTopic'>Customize Packages </div>
        <div className='cusform'>

          <Form className='form' onSubmit={submitHandler}>

            <div className='set1'>
              <Form.Group className='set my-2' controlId='description'>
                <Form.Label className="labelNamePack fw-bold">Description</Form.Label>
                <Form.Control className="textviewPack" type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} required></Form.Control>
              </Form.Group>

              <Form.Group className='set my-2' controlId='require_date'>
                <Form.Label className="labelNamePack fw-bold">Require Date</Form.Label>
                <Form.Control className="textviewPack" type='date' placeholder='Enter package Name' value={require_date} onChange={(e) => setRequiredate(e.target.value)} required></Form.Control>
              </Form.Group>
            </div>

            <div className='set1'>
              <Form.Group className='set my-2' controlId='category'>
                <Form.Label className="labelNamePack fw-bold">Category</Form.Label>
                <Form.Select className="textviewPack" id="category"
                  value={category} onChange={handleCategoryChange}>
                  <option value="">Select Category</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className='set my-2' controlId='features'>
                <Form.Label className="labelNamePack fw-bold">Features</Form.Label>
                <Form.Select className="textviewPack" id="features"
                  value={features} onChange={handleFeaturesChange}>
                  <option value="">Select Preffered Features</option>
                  <option value="20W Battery">20W Battery</option>
                  <option value="50W Battery">50W Battery</option>
                  <option value="100W Battery">100W Battery</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className='set1'>
              <Form.Group className='set my-2' controlId='vehicletype'>
                <Form.Label className="labelNamePack fw-bold">Vehicle Type</Form.Label>
                <Form.Select className="textviewPack" id="vehicleType" required
                  value={vehicletype} onChange={handleVehicleChange}>
                  <option value="">Select vehicle type</option>
                  <option value="scooter">E-Scooter</option>
                  <option value="bike">E-Bike</option>
                  <option value="3wheeler">E-Three wheeler</option>
                  <option value="car">E-Car</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className='set my-2' controlId='model'>
                <Form.Label className="labelNamePack fw-bold">Model</Form.Label>
                <Form.Select className="textviewPack" id="model"
                  value={model} onChange={handleModelChange}>
                  <option value="">Select Preffered Model</option>
                  <option value="Tesla">Tesla</option>
                  <option value="Audi">Audi</option>
                  <option value="BMW">BMW</option>
                  <option value="SUV">SUV</option>
                  <option value="Wega">Wega</option>
                  <option value="Bajaj">Bajaj</option>
                  <option value="Xiomi">Xiomi</option>
                  <option value="Honda">Honda</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className='set2'>
              <Form.Group className='set my-2' controlId='services'>
                <Form.Label className="labelName fw-bold">Services</Form.Label>
                <Form.Select className="textviewPack" id="services"
                  value={services} onChange={handleServicesChange}>
                  <option value="">Select Preffered Service</option>
                  <option value="insurance">Insurance</option>
                  <option value="roadside_assistance">Roadside Assistance</option>
                  <option value="GPS">GPS</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className='set my-2' controlId='color'>
                <Form.Label className="labelNamePack fw-bold">Color</Form.Label>
                <Form.Select className="textviewPack" id="color"
                  value={color} onChange={handleColorChange}>
                  <option value="">Select Preferred Color</option>
                  <option value="Red" style={{ backgroundColor: 'red', color: 'white' }}>Red</option>
                  <option value="Green" style={{ backgroundColor: 'green', color: 'white' }}>Green</option>
                  <option value="Black" style={{ backgroundColor: 'black', color: 'white' }}>Black</option>
                  <option value="Blue" style={{ backgroundColor: 'blue', color: 'white' }}>Blue</option>
                  <option value="White" style={{ backgroundColor: 'white', color: 'black' }}>White</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className='set3'>
              <Form.Group className='set my-2' controlId='duration'>
                <Form.Label className="labelNamePack fw-bold">Duration</Form.Label>
                <Form.Select className="textviewPack" id="duration" required
                  value={duration} onChange={handleDurationChange}>
                  <option value="">Select Duration(days)</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className='set my-2' controlId='totalPrice'>
                <Form.Label className="labelNamePack fw-bold">Total Price</Form.Label>
                <Form.Control className="textviewPack" type='text' value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} readOnly></Form.Control>
              </Form.Group>
            </div>

            {/* Loyalty Points Redemption */}
            <div className='loyaltyPointsRedeemerPack'>
              <p className='instructPack'>You can redeem loyalty points to reduce the Price</p>
              <p className='pointTablePack'>Loyalty Points : {loyaltyPoints}</p>
              <Button className='redeemBTNPack' onClick={handleRedeemPoints}>Redeem</Button>
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <Button type='submit' variant='primary' id='updatePackBTN'>Submit</Button>
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
          <LinkContainer to='/vehicles'>
            <li>
              <Link to='/vehicles' activeClassName='active-link' id='link'>
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
          <LinkContainer to='/reservation'>
            <li>
              <Link to='/reservation' activeClassName='active-link' id='link'>
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
      <div className='footerPack'>
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

export default PackageScreen;