import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CustomStarRating from './CustomStarRating'; // Import the custom star rating component
import { Card, Image, Form, Button } from 'react-bootstrap';
import img1 from '../images/image.jpg'

const ViewFeedback = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [newStarRating, setNewStarRating] = useState(0); // State for star rating
  const [newComment, setNewComment] = useState(''); // State for comment
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/feedback/get-feedback/${id}`);
        setFeedback(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [id]);

  const handleStarRatingChange = (value) => {
    setNewStarRating(value);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/feedback/update-ratings/${id}`, {
        star_rating: newStarRating,
        comment: newComment,
      });
      alert('Rating added successfully!');
      // Optionally redirect or update state as needed after submitting the form
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>View Feedback</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '48%' }}>
          <Card>
            <Card.Header>
              <Card.Title>{feedback.user_name}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Image src="https://th.bing.com/th/id/R.a11e731dd96c95704d63a6384e0a277a?rik=txiid2LcLZdF7g&pid=ImgRaw&r=0" alt="Feedback Image" fluid />
              <p><strong>Age:</strong> {feedback.user_age}</p>
              <p><strong>Gender:</strong> {feedback.user_gender}</p>
              <p><strong>District:</strong> {feedback.user_district}</p>
              <p><strong>Preferred Package:</strong> {feedback.preferred_package}</p>
              <p><strong>Site Usage Frequency:</strong> {feedback.site_usage_frequency}</p>
              <p><strong>Eco Ride Suggestions:</strong> {feedback.eco_ride_suggestions}</p>
            </Card.Body>
          </Card>
        </div>
        <div style={{ width: '48%', marginLeft: '20px', marginTop: '10px', backgroundImage: `url(${img1})`, backgroundSize: 'cover', padding: '20px', color: 'white' }}>
          <Card style={{marginTop: "100px"}}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Label style={{fontSize: "25px"}}>Rate Us as Your Experience</Form.Label>
                  <CustomStarRating
                    value={newStarRating}
                    onChange={handleStarRatingChange}
                  />
                </Form.Group>
                <Form.Group style={{ marginBottom: '15px' }}>
                  <Form.Label>Additional Feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newComment}
                    onChange={handleCommentChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ backgroundColor: '#61D333', width: '250px' }}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;