import React from 'react'
import { Alert } from'react-bootstrap'
import { useTopMoviesQuery } from '../../../../hooks/useTopMovies.js'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from '../MovieCard/MovieCard.jsx';
import './TopMoviesSlideStyle.css'; 


const TopMoviesSlide = () => {
    
    const {data: results, isLoading, isError, error } = useTopMoviesQuery();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <Alert variant='danger'>Error: {error.message}</Alert>
    }
    
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 7,
          slidesToSlide: 3 // optional, default to 1.
        },
        desktop2: {
            breakpoint: { max: 1500, min: 1024 },
            items: 5,
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
    <div className='movie-card-container'>
      <h3 className='movie-slide-title'>Top Rated Movies</h3>
      <Carousel 
        responsive={responsive} 
        infinite={true} 
        centerMode={true} 
        containerClass="carousel-container" 
      >
        {results.map((movie, index) => (
                    <MovieCard movie={movie} key={index} />
                ))}
        </Carousel>
    </div>
  )
}

export default TopMoviesSlide
