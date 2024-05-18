import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="container mt-4" style={{height: "780px"}}>
      <h2>Welcome to Our Feedback System</h2>
      <p>
        This system allows you to provide feedback on various aspects of our service, including:
      </p>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <Card>
            <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.2MIllDCwnfelADd0aOIqNwHaEK?rs=1&pid=ImgDetMain" />
            <Card.Body>
              <Card.Title>View Feedbacks</Card.Title>
              <Card.Text>
                Admin can explore the feedback provided by our users.
              </Card.Text>
              <Button variant="primary" href="/view-all-feedbacks-admin">View Feedbacks</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 mb-4">
          <Card>
            <Card.Img variant="top" src="https://th.bing.com/th/id/OIP.f-ABYrdHjkLQ0idM1PSv7wHaD5?w=480&h=253&rs=1&pid=ImgDetMain" />
            <Card.Body>
              <Card.Title>View All Feedbacks</Card.Title>
              <Card.Text>
              Explore the feedback provided by our users.
              </Card.Text>
              <Button variant="primary" href="/view-all-feedbacks">View All Feedbacks</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;