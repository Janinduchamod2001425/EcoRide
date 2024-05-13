import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

const FeedbackReport = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/feedback/get-feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error.message);
      }
    };
    fetchSuppliers();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div style={{marginBottom: "470px", marginTop: "25px"}}>
      <h2>Feedback Report</h2>
      <div ref={componentRef}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>District</th>
            <th>Preferred Package</th>
            <th>Site Usage Frequency</th>
            <th>Eco Ride Suggestions</th>
            <th>No of Stars</th>
            <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.user_name}</td>
              <td>{feedback.user_age}</td>
              <td>{feedback.user_gender}</td>
              <td>{feedback.user_district}</td>
              <td>{feedback.preferred_package}</td>
              <td>{feedback.site_usage_frequency}</td>
              <td>{feedback.eco_ride_suggestions}</td>
              <td>{feedback.star_rating}</td>
              <td>{feedback.comment}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="button-container">
        <Button onClick={handlePrint}>Download as PDF</Button>
      </div>
    </div>
  );
};

export default FeedbackReport;