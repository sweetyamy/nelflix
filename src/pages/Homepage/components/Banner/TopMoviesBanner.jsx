import React from 'react'
import { useTopMoviesQuery } from '../../../../hooks/useTopMovies';
import Alert from 'react-bootstrap/Alert';
import './BannerStyle.css'; 
import { useLanguage } from '../../../../contexts/LanguageContext';

const Banner = () => {
    const { language } = useLanguage();
    const {data: results, isLoading, isError, error } = useTopMoviesQuery(language);
    
    console.log('isLoading:', isLoading);
    console.log('isError:', isError);
    console.log('Error:', error);
    console.log('Data:', results);
    

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <Alert variant='danger'>Error: {error.message}</Alert>
    }

    // data가 없거나 results가 비어 있을 경우
    if (!Array.isArray(results) || results.length === 0) {
        return <Alert variant='warning'>No data available.</Alert>;
    }

    const poster_path = results[0]?.poster_path;
    const imageUrl = `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${poster_path}`; 
    console.log('Image URL:', imageUrl);
    
  
    return (
        <div
        style={{
          backgroundImage:
            "url(" +
            `${imageUrl}` +
            ")",
        }}
        className="banner"
      >
        <div className="banner-txt-area">
            <h1>{results[0].title}</h1>
            <p>{results[0].overview}</p>
        </div>
            
        </div>
    )
  }
  
  export default Banner