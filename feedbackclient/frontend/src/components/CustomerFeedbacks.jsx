/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import CustomStarRating from './CustomStarRating'; // Importing the CustomStarRating component
import img1 from '../images/image.jpg'

const CustomerFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/feedback/get-feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleStarRatingChange = (feedbackId, starValue) => {
    // Handle star rating change here
    console.log(`Feedback ID: ${feedbackId}, Star Value: ${starValue}`);
    // You can send an API request to update the star rating in your database
  };

  return (
    <div className="mt-4 container">
      <h2 className="mb-4">Customer Feedbacks</h2>
      <Card className="p-4">
        <Row>
          <Col sm={6} style={{backgroundColor: "#E3F8DA"}}>
            <ListGroup variant="flush">
              {feedbacks.map((feedback, index) => (
                <ListGroup.Item key={index} className="mb-3">
                  <Row className="align-items-center">
                    <Col sm={2}>
                      <img
                        src={'https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=muXZvm3dsoQqwg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-person-icon-png-people-person-user-icon-2240.png&ehk=MfHYkGonqy7I%2fGTKUAzUFpbYm9DhfXA9Q70oeFxWmH8%3d&risl=&pid=ImgRaw&r=0'} // Assuming feedback has a user_image field
                        alt="User Avatar"
                        className="img-fluid rounded-circle"
                        style={{ width: '50px', height: '50px' }}
                      />
                    </Col>
                    <Col sm={8}>
                      <div>
                        <strong>{feedback.user_name}</strong>
                        <CustomStarRating
                          value={feedback.star_rating}
                          onChange={(starValue) => handleStarRatingChange(feedback._id, starValue)}
                        />
                      </div>
                      <div>{feedback.comment}</div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col sm={6}>
            {/* Image placeholder */}
            <img
              src={img1}
              alt="Feedback Image"
              className="img-fluid"
              style={{height: "780px"}}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CustomerFeedbacks;