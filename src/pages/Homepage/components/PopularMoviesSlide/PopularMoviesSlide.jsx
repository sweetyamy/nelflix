import React from 'react'
import { Alert } from 'react-bootstrap'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';


const PopularMoviesSlide = () => {
  
    const {data, isLoading, isError, error } = usePopularMoviesQuery();
    console.log('popular data: ', data);
    const movies = data?.results || [];
    console.log('Movies in PopularMoviesSlide:', movies);
    
    if (isLoading) {
        return <div>Loading...</div>
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
