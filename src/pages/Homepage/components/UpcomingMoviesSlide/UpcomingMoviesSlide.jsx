import React from 'react'
import { Alert, Spinner } from'react-bootstrap'
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies.js'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import "react-multi-carousel/lib/styles.css";
import { responsive } from '../../../../constants/responsive';


const UpcomingMoviesSlide = () => {
    
  const {data, isLoading, isError, error } = useUpcomingMoviesQuery();
  console.log('Upcoming data: ', data); 
    const movies = data;
    console.log('Movies in UpcomingMoviesSlide:', movies);
  
  if (isLoading || !data) {
    return <div className='spinner-area d-flex justify-content-center align-items-center'>
    <Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />
  </div>;
}

  if (isError) {
      return <Alert variant='danger'>Error: {error.message}</Alert>
  }

return (
  <div>
      <MovieSlider title='Upcoming' movies={movies} responsive={responsive} />
  </div>
)
}

export default UpcomingMoviesSlide
