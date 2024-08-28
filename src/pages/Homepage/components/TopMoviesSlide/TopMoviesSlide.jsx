import React from 'react'
import { Alert } from'react-bootstrap'
import { useTopMoviesQuery } from '../../../../hooks/useTopMovies.js'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import "react-multi-carousel/lib/styles.css";
import { responsive } from '../../../../constants/responsive';


const TopMoviesSlide = () => {
    
  const {data, isLoading, isError, error } = useTopMoviesQuery();
  console.log('Top data: ', data);
  
  if (isLoading) {
      return <div>Loading...</div>
  }

  if (isError) {
      return <Alert variant='danger'>Error: {error.message}</Alert>
  }
  
  const movies = data?.results || [];
  console.log('Movies in TopMoviesSlide:', movies);

return (
  <div>
      <MovieSlider title='Top' movies={movies} responsive={responsive} />
  </div>
)
}

export default TopMoviesSlide
