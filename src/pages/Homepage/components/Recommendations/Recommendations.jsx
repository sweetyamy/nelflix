import React, { useEffect } from 'react';
import MovieCard from '../../../../common/MovieCard/MovieCard'; 
import { Alert, Spinner } from 'react-bootstrap';
import { useMovieRecommendationsQuery } from '../../../../hooks/useMovieRecommendations';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './RecommendationsStyle.css';

const Recommendations = ({ movieId }) => {
    const { data: recommendations = [], isLoading, isError } = useMovieRecommendationsQuery(movieId);

    useEffect(() => {
        console.log('recommendations:', recommendations);
    }, [recommendations]);

    if (isLoading) {
        return (
          <div className='spinner-area'>
            <Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />
          </div>
        );
    }

    if (isError) {
        return <Alert variant='danger'>Error</Alert>;
    }

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div>
            <h2 className='text-center'>Recommendations</h2>
            {recommendations.length > 0 ? (
                <Carousel 
                    responsive={responsive} 
                    infinite={true} 
                    autoPlay={true} 
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                >
                    {recommendations.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </Carousel>
            ) : (
                <p>No recommendations</p>
            )}
        </div>
    );
};

export default Recommendations;