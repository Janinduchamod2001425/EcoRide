import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import '../styles/Register.css';
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
import signUpImage from '../images/Register/Sign Up Image.png'
import herb from '../images/Register/Herb.png'

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const roles = ["Customer", "Vehicle Owner", "Driver", "Admin"];

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState(new Date());

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await register({ name, email, contact, password, role }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Registration successful', {
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
        <div className="py-5">

            <div className='searchbar'>
                <img src={searchIcon} className="search_icon" />
            </div>

            <div className='bacgroundImage1'>
                <div className='signUpBG'><img src={signUpImage} className="signUImage" /></div>
                <div className='signUpForm'>
                    <p className='formTitle'>Sign Up</p>

                    <Form onSubmit={submitHandler}>

                        <Form.Group className='set my-2' controlId='name'>
                            <Form.Label className="labelName fw-bold">Name</Form.Label>
                            <Form.Control className="textview" type='text' placeholder='Enter your full Name' value={name} onChange={(e) => setName(e.target.value)} required></Form.Control>
                        </Form.Group>

                        <Form.Group className='set my-2' controlId='email'>
                            <Form.Label className="labelName fw-bold">Email Address</Form.Label>
                            <Form.Control className="textview" type='email' placeholder='Enter your valid Email' value={email} onChange={(e) => setEmail(e.target.value)} required></Form.Control>
                        </Form.Group>

                        <Form.Group className='set my-2' controlId='contact'>
                            <Form.Label className="labelName fw-bold">Contact No.</Form.Label>
                            <Form.Control className="textview" type='number' placeholder='Enter your phone no.' value={contact} onChange={(e) => setContact(e.target.value)} required></Form.Control>
                        </Form.Group>

                        <Form.Group className='set my-2' controlId='password'>
                            <Form.Label className="labelName fw-bold">Create Password</Form.Label>
                            <InputGroup className='textview1'>
                                <Form.Control className="textview"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter strong Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputGroup.Text className="visiblePassword">
                                    {showPassword ? (
                                        <FiEyeOff onClick={() => setShowPassword(!showPassword)} />
                                    ) : (
                                        <FiEye onClick={() => setShowPassword(!showPassword)} />
                                    )}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='my-2' controlId='role'>
                            <Form.Label className="labelName fw-bold">Role</Form.Label>
                            <Form.Control className="textview" as='select' value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="" disabled>Select your role</option>
                                {roles.map((role, index) => (
                                    <option key={index} value={role}>{role}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {isLoading && <Loader />}

                        <Button type='submit' variant='primary' id='saveBTN'>Save</Button>

                        <Row className='py-3'>
                            <Col id="alreadyAcc">
                                Already have an account? <Link to='/login' id="log">Login</Link>
                            </Col>
                        </Row>
                    </Form>
                </div>

                <div className='QuoteBar'>
                    <p className='quote'>"Electric vehicles: Silent saviors of nature."</p>
                    <img src={herb} className="herb" />
                </div>
            </div>

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
                    <LinkContainer to='/vehicles'>
                        <li>
                            <NavLink to='/vehicles' activeClassName='active-link' id='link'>
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
                    <LinkContainer to='/reservation'>
                        <li>
                            <NavLink to='/reservation' activeClassName='active-link' id='link'>
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
                    <LinkContainer to='/logout' onClick={logoutHandler}>
                        <li>
                            <NavLink to='/logout' activeClassName='active-link' id='link'>
                                <img src={Image9} id='image1' />&nbsp;&nbsp; Remove Account
                            </NavLink>
                        </li>
                    </LinkContainer>
                </ul>
            </div>


        </div>
    )
}

export default RegisterScreen;


