import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const FormContainer = ({ children, submitHandler }) => {
    return (
        <Container>
            <Row className='justify-content-md-center mt-5'>
                <Col xs={12} md={6} className='card p-5'>
                    <Form onSubmit={submitHandler}>
                        {children}
                        {/* <Button type="submit" variant="success" className="mt-3">
                            Create New Record
                        </Button> */}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FormContainer;
