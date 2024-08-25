import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner/Banner.jsx';

// 1. banner
// 2. popular movies
// 3. top related movies
// 4. upcoming movies

const Homepage = () => {
  console.log('Rendering Homepage component');

  return (
    <div>
      <Banner />
    </div>
  )
}

export default Homepage
