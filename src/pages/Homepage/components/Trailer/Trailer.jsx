import React from 'react';
import { useMovieTrailerQuery } from '../../../../hooks/useMovieTrailer';
import { Spinner } from 'react-bootstrap';
import './Trailer.style.css';

const Trailer = ({ movieId }) => {
    const { data: trailer, error, isLoading } = useMovieTrailerQuery(movieId);

    if (isLoading) {
        return (
            <div className='spinner-area d-flex justify-content-center align-items-center'>
                <Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message || 'An error occurred'}</div>;
    }

    if (!trailer) {
        return <div>No trailer available</div>;
    }

    return (
        <div className="trailer-container">
            <iframe
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Trailer;