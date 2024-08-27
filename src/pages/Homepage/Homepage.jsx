import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner/PopularMoviesBanner.jsx';
import PopularMoviesSlide from './components/PopularMoviesSlide/PopularMoviesSlide.jsx';
import TopMoviesSlide from './components/TopMoviesSlide/TopMoviesSlide.jsx';
import UpcomingMoviesSlide from './components/UpcomingMoviesSlide/UpcomingMoviesSlide.jsx';

// 1. banner
// 2. popular movies
// 3. top related movies
// 4. upcoming movies

const Homepage = () => {
  console.log('Rendering Homepage component');

  return (
    <div>
      <Banner />
      <PopularMoviesSlide />
      <TopMoviesSlide />
      <UpcomingMoviesSlide />
    </div>
  )
}

export default Homepage
