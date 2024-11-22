import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useGetPaymentByCustomerIdMutation } from '../slices/paymentApiSlice';
import '../styles/CusPayments.css';
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
import searchIcon from '../images/home/search.png';

const CustomerPaymentsScreen = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const cusId = userInfo._id;

    const [getPaymentByCusId, { data: payments = [] }] = useGetPaymentByCustomerIdMutation(cusId);

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState(new Date());

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    useEffect(() => {
        getPaymentByCusId(cusId);
    }, [getPaymentByCusId]);

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
    };


    return (
        <div className='py-5'>

            <div className='searchbar'>
                <img src={searchIcon} className="search_icon" />
            </div>

            <div className='bacgroundImage'>
                <p className='reportTitle'>Payment Details</p>
                {/* <Link to='http://localhost:3000/' className='dashboardLink'>Access the Admin Panel</Link> */}

                <Table className='userTable'>
                    <thead>
                        <tr>
                            <th>Card Type</th>
                            <th>Card Number</th>
                            <th>Expire Date</th>
                            <th>CVV</th>
                            <th>Paid Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment._id}>
                                <td>{payment.cardtype}</td>
                                <td>{payment.cardnumber}</td>
                                <td>{payment.expiredate}</td>
                                <td>{payment.cvv}</td>
                                <td>{new Date(payment.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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

export default CustomerPaymentsScreen