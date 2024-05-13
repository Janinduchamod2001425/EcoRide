import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';

const ViewAllFeedbacksAdmin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/feedback/get-feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/feedback/delete-feedback/${id}`);
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== id));
      console.log('Feedback deleted successfully');
      setShowModal(false);
      alert('Feedback deleted successfully');
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const handleShowModal = (feedback) => {
    setSelectedFeedback(feedback);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedFeedback(null);
    setShowModal(false);
  };

  return (
    <div style={{height: "785px", backgroundColor: "#E3F8DA"}}>
      <h2>All Feedbacks</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Age</th>
            <th>Gender</th>
            <th>District</th>
            <th>Preferred Package</th>
            <th>Site Usage Frequency</th>
            <th>Eco Ride Suggestions</th>
            <th>No of Stars</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.user_name}</td>
              <td>{''}</td>
              <td>{feedback.user_age}</td>
              <td>{feedback.user_gender}</td>
              <td>{feedback.user_district}</td>
              <td>{feedback.preferred_package}</td>
              <td>{feedback.site_usage_frequency}</td>
              <td>{feedback.eco_ride_suggestions}</td>
              <td>{feedback.star_rating}</td>
              <td>{feedback.comment}</td>
              <td>
              <Button as={Link} to={`/view-feedback/${feedback._id}`} style={{backgroundColor: "#61D333"}}>View</Button>
{' '}
<Button variant="warning" as={Link} to={`/update-feedback/${feedback._id}`}>Update</Button>
{' '}
                <Button variant="danger" onClick={() => handleShowModal(feedback)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFeedback && (
            <p>Are you sure you want to delete the feedback from {selectedFeedback.user_name}?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="danger" onClick={() => handleDelete(selectedFeedback._id)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewAllFeedbacksAdmin;