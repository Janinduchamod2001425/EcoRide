import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import '../styles/AddMaintenance.css';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useScheduleMutation } from "../slices/maintenanceApiSlice";
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

const AddMaintenanceScreen = () => {

    const [vin, setVin] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState(0);
    const [mileage, setMileage] = useState(0);
    const [serviceDate, setServicedate] = useState(null);
    const [nextServiceDate, setNextServiceDate] = useState(null);
    const [licensePlate, setLicensePlate] = useState('');
    const [maintenanceStatus, setMaintenanceStatus] = useState('');

    const [create, { isLoading }] = useScheduleMutation();

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState(new Date());

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await create({ vin, make, model, year, mileage, serviceDate, nextServiceDate, licensePlate, maintenanceStatus }).unwrap();
            // dispatch(setCredentials({ ...res }));
            toast.success('Maintenance Scheduled successfuly', {
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

    const handleToggle = () => {
        setMaintenanceStatus(!maintenanceStatus); // Toggle the status when the button is clicked
    };

    return (
        <div className='py-5'>

            <div className='searchbar'>
                <img src={searchIcon} className="search_icon" />
            </div>

            <div className='bacgroundImage'>
                <div className='maintenanceTopic'>Schedule Maintenance</div>
                <div className='cusform'>

                    <Form className='form' onSubmit={submitHandler}>

                        <div className='setRep1'>
                            <Form.Group className='set my-2' controlId='vin'>
                                <Form.Label className="labelNameRep fw-bold">VIN</Form.Label>
                                <Form.Control className="textviewRep" type='text' placeholder='Enter vin no' value={vin} onChange={(e) => setVin(e.target.value)} required></Form.Control>
                            </Form.Group>

                            <Form.Group className='set my-2' controlId='make'>
                                <Form.Label className="labelNameRep fw-bold">Make</Form.Label>
                                <Form.Control className="textviewRep" type='text' placeholder='Enter make' value={make} onChange={(e) => setMake(e.target.value)} required></Form.Control>
                            </Form.Group>
                        </div>

                        <div className='setRep1'>

                            <Form.Group className='set my-2' controlId='model'>
                                <Form.Label className="labelNameRep fw-bold">Model</Form.Label>
                                <Form.Control className="textviewRep" type='text' placeholder='Enter Vehicle Model' value={model} onChange={(e) => setModel(e.target.value)} required></Form.Control>
                            </Form.Group>

                            <Form.Group className='set my-2' controlId='year'>
                                <Form.Label className="labelNameRep fw-bold">Year</Form.Label>
                                <Form.Control className="textviewRep" type='number' placeholder='Enter year' value={year} onChange={(e) => setYear(e.target.value)} required></Form.Control>
                            </Form.Group>
                        </div>

                        <div className='setRep1'>

                            <Form.Group className='set my-2' controlId='mileage'>
                                <Form.Label className="labelNameRep fw-bold">Mileage</Form.Label>
                                <Form.Control className="textviewRep" type='number' placeholder='Enter Mileage' value={mileage} onChange={(e) => setMileage(e.target.value)} required></Form.Control>
                            </Form.Group>

                            <Form.Group className='set my-2' controlId='serviceDate'>
                                <Form.Label className="labelNameRep fw-bold">Service Date</Form.Label>
                                <Form.Control className="textviewRep" type='date' value={serviceDate} onChange={(e) => setServicedate(e.target.value)} required></Form.Control>
                            </Form.Group>


                        </div>

                        <div className='setRep2'>

                            <Form.Group className='set my-2' controlId='nextServiceDate'>
                                <Form.Label className="labelNameRep fw-bold">Next Service Date</Form.Label>
                                <Form.Control className="textviewRep" type='date' value={nextServiceDate} onChange={(e) => setNextServiceDate(e.target.value)} required></Form.Control>
                            </Form.Group>

                            <Form.Group className='set my-2' controlId='licensePlate'>
                                <Form.Label className="labelNameRep fw-bold">License Plate</Form.Label>
                                <Form.Control className="textviewRep" type='text' placeholder='Enter License plate no' value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} required></Form.Control>
                            </Form.Group>

                        </div>

                        <div className='setRep3'>
                            <Form.Group className='set my-2' controlId='maintenanceStatus'>
                                <Form.Label className="labelNameRep fw-bold">Maintenance Status</Form.Label>
                                <div>
                                    <Button className='mainStatus'
                                        variant={maintenanceStatus ? 'success' : 'danger'}
                                        onClick={handleToggle}
                                    >
                                        {maintenanceStatus ? 'True' : 'False'}
                                    </Button>
                                </div>
                            </Form.Group>
                        </div>

                        {isLoading ? (
                            <Loader />
                        ) : (
                            <Button type='submit' variant='primary' id='repairBTN'>Submit</Button>
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

export default AddMaintenanceScreen;