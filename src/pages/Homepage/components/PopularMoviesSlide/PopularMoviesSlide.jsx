import React from 'react'
import { Alert, Spinner } from'react-bootstrap'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';


const PopularMoviesSlide = () => {
  
    const {data, isLoading, isError, error } = usePopularMoviesQuery();
    console.log('popular data: ', data);
    const movies = data;
    console.log('Movies in PopularMoviesSlide:', movies);
    
    if (isLoading) {
      return (
        <div className='spinner-area d-flex justify-content-center align-items-center'>
          <Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />
        </div>
      );
    }

    if (isError) {
        return <Alert variant='danger'>Error: {error.message}</Alert>
    }

  return (
    <div>
        <MovieSlider title='Popular' movies={movies} responsive={responsive} />
    </div>
  )
}

export default PopularMoviesSlide
