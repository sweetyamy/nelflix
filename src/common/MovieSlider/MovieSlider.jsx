import React from 'react'
import "./MovieSliderStyle.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from '../MovieCard/MovieCard';

const MovieSlider = ({title, movies, responsive}) => {
  console.log('Movies in MovieSlider:', movies);

  if (!movies || !Array.isArray(movies)) {
    return <div>No movies available</div>;
  }

  return (
    <div className='movie-card-container'>
      <h3 className='movie-slide-title'>{title} Movies</h3>
      <Carousel 
        responsive={responsive} 
        infinite={true} 
        centerMode={true} 
        containerClass="carousel-container" 
      >
        {movies.map((movie, index) => (
            <MovieCard movie={movie} key={index} />
        ))}
        </Carousel>
    </div>
  )
}

export default MovieSlider
