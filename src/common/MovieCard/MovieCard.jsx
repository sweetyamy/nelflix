import React from 'react'
import { Badge } from'react-bootstrap';
import './MovieCardStyle.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faSquarePollVertical, faCircleUser  } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({movie}) => {
    const poster_path = movie.poster_path;
    const imageUrl = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`; 
    // console.log('Image URL:', imageUrl);
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `${imageUrl}` +
          ")",
      }}
      className="movie-card"
    >
      <div className='movie-card-info'>
        <div className="movie-card-badge-container">
            {/* genre_ids가 존재하는지 확인 후 map 실행 */}
            {movie.genre_ids && movie.genre_ids.length > 0 ? (
                movie.genre_ids.map((id, index) => (
                    <Badge bg="danger" key={index} className="movie-card-badge">{id}</Badge>
                ))
            ) : (
                <Badge bg="secondary" className="movie-card-badge">No Genre</Badge>
            )}
          </div>
          
          <h1 className='movie-card-title'>
            {movie.title.length > 20 ? movie.title.substring(0, 20) + '...' : movie.title}
          </h1>
          <div className='movie-card-txt'>
            <div><FontAwesomeIcon icon={faSquarePollVertical} className='movie-card-ico-vote' />{parseFloat(movie.vote_average).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <div><FontAwesomeIcon icon={faFire} className='movie-card-ico-fire' />{parseFloat(movie.popularity).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <div><FontAwesomeIcon icon={ faCircleUser } className='movie-card-ico-user' /> { movie.adult ? "Adult" : "Under 18"}</div>
          </div>
      </div>
    </div>
  )
}

export default MovieCard
