import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import img1 from '../images/image.jpg'

const districtsData = [
  { id: 1, name: 'Colombo' },
  { id: 2, name: 'Gampaha' },
  { id: 3, name: 'Kandy' },
  { id: 4, name: 'Kurunegala' },
  { id: 5, name: 'Puttalam' },
  { id: 6, name: 'Jaffna' },
  { id: 7, name: 'Mannar' },
  { id: 8, name: 'Vavuniya' },
  { id: 9, name: 'Mullaitivu' },
  { id: 10, name: 'Kilinochchi' },
  { id: 11, name: 'Batticaloa' },
  { id: 12, name: 'Ampara' },
  { id: 13, name: 'Trincomalee' },
  { id: 14, name: 'Kurunegala' },
  { id: 15, name: 'Polonnaruwa' },
  { id: 16, name: 'Anuradhapura' },
  { id: 17, name: 'Matale' },
  { id: 18, name: 'Nuwara Eliya' },
  { id: 19, name: 'Kegalle' },
  { id: 20, name: 'Ratnapura' },
  { id: 21, name: 'Galle' },
  { id: 22, name: 'Matara' },
  { id: 23, name: 'Hambantota' },
  { id: 24, name: 'Badulla' },
  { id: 25, name: 'Monaragala' },
];

const UpdateFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: '',
    user_age: '',
    user_gender: '',
    user_district: '',
    preferred_package: '',
    site_usage_frequency: '',
    eco_ride_suggestions: '',
    find_web: '',
    like_post: '',
  });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/feedback/get-feedback/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/feedback/update-feedback/${id}`, formData);
      alert('Feedback updated successfully');
      navigate('/view-all-feedbacks');
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Feedback</h2>
      <Row>
        <Col sm={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="user_name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="user_age">
                  <Form.Label>Age:</Form.Label>
                  <Form.Control
                    type="number"
                    name="user_age"
                    value={formData.user_age}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="user_gender">
                  <Form.Label>Gender:</Form.Label>
                  <Form.Control
                    as="select"
                    name="user_gender"
                    value={formData.user_gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="user_district">
                  <Form.Label>District:</Form.Label>
                  <Form.Control
                    as="select"
                    name="user_district"
                    value={formData.user_district}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select District</option>
                    {districtsData.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="preferred_package">
                  <Form.Label>Preferred Package:</Form.Label>
                  <Form.Control
                    as="select"
                    name="preferred_package"
                    value={formData.preferred_package}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Preferred Package</option>
                    <option value="Eco Commute Package">Eco Commute Package</option>
                    <option value="Family Mobility Package">Family Mobility Package</option>
                    <option value="Adventure Seeker">Adventure Seeker</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="site_usage_frequency">
                  <Form.Label>Site Usage Frequency:</Form.Label>
                  <Form.Control
                    type="text"
                    name="site_usage_frequency"
                    value={formData.site_usage_frequency}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="eco_ride_suggestions">
                  <Form.Label>Eco Ride Suggestions:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="eco_ride_suggestions"
                    value={formData.eco_ride_suggestions}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="find_web">
                  <Form.Label>How to give our website details?</Form.Label>
                  <Form.Control
                    as="select"
                    name="find_web"
                    value={formData.find_web}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="friend">Friend</option>
                    <option value="search Google">Search Google</option>
                    <option value="advertisement TV program">Advertisement TV Program</option>
                    <option value="Google ads">Google Ads</option>
                    <option value="any other">Any Other</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="like_post">
                  <Form.Label>How do you like to post his feedback?</Form.Label>
                  <Form.Control
                    as="select"
                    name="like_post"
                    value={formData.like_post}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Anonymous feedback">Anonymous Feedback</option>
                    <option value="booking process">Booking Process</option>
                    <option value="vehicle performance">Vehicle Performance</option>
                    <option value="customer support">Customer Support</option>
                    <option value="environmental impact">Environmental Impact</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" style={{marginTop: "25px"}}>
                  Update Feedback
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6}>
          <img
            src={img1}
            alt="placeholder"
            style={{ width: '100%', height: '680px' }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UpdateFeedback;