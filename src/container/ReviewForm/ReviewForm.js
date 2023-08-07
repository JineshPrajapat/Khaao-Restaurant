import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './ReviewForm.scss';
import SuccessMessage from '../SuccessMessage/SuccessMessage';

const ReviewForm = () => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);                                     // New state for the star rating
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);         // State for showing success message

  const inputAnimation = useSpring({
    display: isInputVisible ? 'block' : 'none',
    transform: isInputVisible ? 'translateY(0)' : 'translateY(20px)',
  });

  const handleSubmit = () => {
    // Handle review submission logic
    console.log('Review submitted:', { reviewText, rating });

    // Show success message for 5 seconds
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
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
        <button className= "submit" onClick={handleSubmit}>Submit Review</button>
      </animated.div>
      {showSuccessMessage && <SuccessMessage message="Review submitted successfully!" />}
    </div>
  );
};

export default ReviewForm;
