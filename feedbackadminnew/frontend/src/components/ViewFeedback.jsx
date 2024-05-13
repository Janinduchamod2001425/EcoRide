import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CustomStarRating from './CustomStarRating'; // Import the custom star rating component
import { Card, Image, Form, Button, Modal } from 'react-bootstrap';

const ViewFeedback = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [newStarRating, setNewStarRating] = useState(0); // State for star rating
  const [newComment, setNewComment] = useState(''); // State for comment
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State for showing the modal

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
      setShowModal(false); // Close the modal after updating feedback
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
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Rate Us
          </Button>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Rate Us</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Rate Your Experience</Form.Label>
                  <CustomStarRating
                    value={newStarRating}
                    onChange={handleStarRatingChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Add a Comment (optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newComment}
                    onChange={handleCommentChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" style={{margin: "25px"}}>
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewFeedback;