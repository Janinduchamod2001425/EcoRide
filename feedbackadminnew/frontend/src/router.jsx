import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddFeedback from './components/AddFeedback';
import ViewAllFeedbacks from './components/ViewAllFeedbacks';
import ViewFeedback from './components/ViewFeedback';
import UpdateFeedback from './components/UpdateFeedback';
import Home from './components/Home';
import Header from './components/header';
import Footer from './components/footer';
import FeedbackReport from './components/FeedbackReport';
import ViewAllFeedbacksAdmin from './components/ViewAllFeedbacksAdmin';
import CustomerFeedbacks from './components/CustomerFeedbacks';

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CustomerFeedbacks />} />
        <Route path="/view-all-feedbacks" element={<ViewAllFeedbacks />} />
        <Route path="/view-feedback/:id" element={<ViewFeedback />} />
        <Route path="/update-feedback/:id" element={<UpdateFeedback />} />
        <Route path="/feedback-report" element={<FeedbackReport />} />
        <Route path="/view-all-feedbacks-admin" element={<ViewAllFeedbacksAdmin />} />
        <Route path="/customer-feedbacks" element={<CustomerFeedbacks />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;