import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useUpdateBookingMutation, useDeleteBookingMutation } from '../slices/bookingApiSlice';
import '../styles/Booking.css';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useLogoutMutation } from "../slices/usersApiSlice";
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

const VehicleBookingUpdateScreen = () => {

    const [reserve_date, setReserveDate] = useState(null);
    const [duration, setDuration] = useState(0);
    const [total_price, setTotalPrice] = useState(0);
    const [loyaltyPoints, setLoyaltyPoints] = useState(10000);

    const location = useLocation();
    const { search } = location;
    const params = new URLSearchParams(search);

    const vehicle = params.get('vehicle') ;
    const category = params.get('category') || '';
    const model = params.get('model') || '';
    const price = parseFloat(params.get('price')) || 0;

    useEffect(() => {
        setReserveDate(params.get('reserve_date') || null);
        setDuration(parseInt(params.get('duration'), 10) || 0);
        setTotalPrice(parseFloat(params.get('total_price')) || 0);
    }, [params]);

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState(new Date());

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updateBooking, { isLoading }] = useUpdateBookingMutation();

    const handleDurationChange = (e) => {
        const days = parseInt(e.target.value, 10);
        setDuration(days);
        setTotalPrice(days * price);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await updateBooking({ reserve_date, duration, total_price }).unwrap();
            toast.success('Booking Updated Successfully', {
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
            navigate(`/payment?vehicle=${vehicle}&total_price=${total_price}`);
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

    const handleRedeemPoints = () => {
        // Example logic to redeem points
        const pointsToRedeem = 5000; // Adjust based on your logic
        if (loyaltyPoints >= pointsToRedeem) {
            const pointsDiscount = pointsToRedeem / 100; // Example: 1 point = $0.01 discount
            setTotalPrice(total_price - pointsDiscount);
            setLoyaltyPoints(loyaltyPoints - pointsToRedeem);
        } else {
            toast.error('Insufficient loyalty points to redeem.', {
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

    return (
        <div className='py-5'>

            {/* search  */}
            <div className='searchbar'>
                <img src={searchIcon} className="search_icon" />
            </div>

            <div className='bacgroundImage'>

                <p className='bookingTopic'>Reservation Details</p>

                <div className='licenseForm'>
                    <Form className='licenseCard' onSubmit={submitHandler}>

                        <Form.Group className='set my-2' controlId='vehicle'>
                            <Form.Label className="labelNameBook fw-bold">Vehicle Number</Form.Label>
                            <Form.Control className="textviewBook" type='text' value={vehicle} readOnly></Form.Control>
                        </Form.Group>

                        <Form.Group className='set my-2' controlId='category'>
                            <Form.Label className="labelNameBook fw-bold">Category</Form.Label>
                            <Form.Control className="textviewBook" type='text' value={category} readOnly></Form.Control>
                        </Form.Group>

                        <Form.Group className='set my-2' controlId='model'>
                            <Form.Label className="labelNameBook fw-bold">Model</Form.Label>
                            <Form.Control className="textviewBook" type='text' value={model} readOnly></Form.Control>
                        </Form.Group>

                        <Form.Group className='set my-2' controlId='price'>
                            <Form.Label className="labelNameBook fw-bold">Default Price (1 Day)</Form.Label>
                            <Form.Control className="textviewBook" type='number' value={price} readOnly></Form.Control>
                        </Form.Group>

                        <Form.Group className='set my-2' controlId='reserve_date'>
                            <Form.Label className="labelNameBook fw-bold">Reserve Date</Form.Label>
                            <Form.Control className="textviewBook" type='date' value={reserve_date} onChange={(e) => setReserveDate(e.target.value)} required></Form.Control>
                        </Form.Group>

                        <Form.Group className='set my-2' controlId='duration'>
                            <Form.Label className="labelNameBook1 fw-bold">Duration (Days)</Form.Label>
                            <Form.Control className="textviewBook1" type='number' value={duration} onChange={handleDurationChange} required></Form.Control>
                        </Form.Group>

                        <Form.Group className='set my-2' controlId='total_price'>
                            <Form.Label className="labelNameBook2 fw-bold">Final Price</Form.Label>
                            <Form.Control className="textviewBook2" type='number' value={total_price} onChange={(e) => setTotalPrice(e.target.value)} readOnly required></Form.Control>
                        </Form.Group>

                        {/* Loyalty Points Redemption */}
                        <div className='loyaltyPointsRedeemer'>
                            <p className='instruct'>You can redeem loyalty points to reduce the Price</p>
                            <p className='pointTable'>Loyalty Points : {loyaltyPoints}</p>
                            <Button className='redeemBTN' onClick={handleRedeemPoints}>Redeem</Button>
                        </div>

                        {isLoading ? (
                            <Loader />
                        ) : (
                            <Button type='submit' variant='primary' id='BookingBTN'>Update Booking</Button>
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
                    <LinkContainer to='/payment'>
                        <li>
                            <Link to='/payment' activeClassName='active-link' id='link'>
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
            <div className='footer'>
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

export default VehicleBookingUpdateScreen;