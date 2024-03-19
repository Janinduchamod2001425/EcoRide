import React from 'react';
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import '../styles/Register.css';

const RegisterScreen = () => {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ conatct, setContact ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ role, setRole ] = useState("");

    const roles = ["Customer", "Vehicle Owner", "Driver", "Admin"];

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit');
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter your full name' value={name} onChange={(e) => setName(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter your valid email' value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='contact'>
                    <Form.Label>Contact No.</Form.Label>
                    <Form.Control type='text' placeholder='Enter your phone no.' value={conatct} onChange={(e) => setContact(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Create Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter strong password' value={password} onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password again' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='role'>
                    <Form.Label>Role</Form.Label>
                    <Form.Control as='select' value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="" disabled>Select your role</option>
                        {roles.map((role, index) => (
                            <option key={index} value={role}>{role}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='success' className='mt-3'>
                    Sign In
                </Button>

                <Row className='py-3'>
                    <Col>
                        Already have an account? <Link to='/login'>Sign In</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen;