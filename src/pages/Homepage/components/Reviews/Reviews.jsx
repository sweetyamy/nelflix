import React, { useState } from 'react';
import { useMovieReviewsQuery } from '../../../../hooks/useMovieReviews';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const MovieReviews = ({ movieId }) => {
  const { data, isLoading, isError, error } = useMovieReviewsQuery(movieId);

  if (isLoading) {
    return (
      <div className='spinner-area d-flex justify-content-center align-items-center'>
        <Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading movie reviews: {error.message}</div>;
  }

  const reviews = Array.isArray(data?.results) ? data.results : [];

  if (!reviews || reviews.length === 0) {
    return <div>No movie reviews available</div>;
  }

  return (
    <div className="reviews-container">
      <h2>Movie Reviews</h2>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

const ReviewItem = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false); 

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded); 
  };

  const renderContent = () => {
    if (review.content.length <= 300) {
      return <p>{review.content}</p>; 
    }

    if (isExpanded) {
      return (
        <p>{review.content}
        <button onClick={toggleExpanded} className="btn btn-link">
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        </p> 
      );
    } else {
      return (
        <p>{review.content.slice(0, 300)}...
          <button onClick={toggleExpanded} className="btn btn-link">
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </p>
      );
    }
  };

  return (
    <div className="review-item mb-4"> 
      <h4>{review.author}</h4>
      {renderContent()} 
      {review.rating && <span>Rating: {review.rating}/10</span>} 
      <hr />
    </div>
  );
};

export default MovieReviews;
