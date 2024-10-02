import React, { useState } from 'react';
import axios from "axios";
import { useSpring, animated } from 'react-spring';
import './ReviewForm.scss';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import { baseURL } from "../../config/api";

const ReviewForm = () => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);                                     // New state for the star rating
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);         // State for showing success message

  const inputAnimation = useSpring({
    display: isInputVisible ? 'block' : 'none',
    transform: isInputVisible ? 'translateY(0)' : 'translateY(20px)',
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    console.log('Review submitted:', { reviewText, rating });
    axios.post(`${baseURL}/review/addreview`,
      {
        reviewText,
        rating
      }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })
      .then((response) => {
        // Show success message for 5 seconds
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      })
      .finally(() => {
        setReviewText("");
        setRating(0);
      })
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="review-form">
      <button onClick={() => setInputVisible(true)}>Write a Review</button>
      <animated.div style={inputAnimation}>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={value <= rating ? 'star filled' : 'star'}
              onClick={() => handleRatingChange(value)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <button className="submit" onClick={handleSubmit}>Submit Review</button>
      </animated.div>
      {showSuccessMessage && <SuccessMessage message="Review submitted successfully!" />}
    </div>
  );
};

export default ReviewForm;
