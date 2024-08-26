import React from 'react'
import { Alert } from'react-bootstrap'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from '../MovieCard/MovieCard.jsx';

const PopularMoviesSlide = () => {
    
    const {data: results, isLoading, isError, error } = usePopularMoviesQuery();
    console.log('PopularMoviesSlide isLoading:', isLoading);
    console.log('PopularMoviesSlide isError:', isError);
    console.log('PopularMoviesSlide Error:', error);
    console.log('PopularMoviesSlide Results:', results);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <Alert variant='danger'>Error: {error.message}</Alert>
    }
    
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 8,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

  return (
    <div>
      <h3>Popular Movies</h3>
      <Carousel 
        responsive={responsive} 
        infinite={true} 
        centerMode={true} 
        containerClass="carousel-container" 
        itemClass="carousel-item-padding-40-px"
      >
        {results.map((movie, index) => (
                    <MovieCard movie={movie} key={index} />
                ))}
    </Carousel>
    </div>
  )
}

export default PopularMoviesSlide
