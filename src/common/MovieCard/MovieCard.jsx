import React from 'react'
import { Badge } from'react-bootstrap';
import './MovieCardStyle.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faSquarePollVertical, faCircleUser  } from '@fortawesome/free-solid-svg-icons';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movie}) => {

  const navigate = useNavigate();

  const {data: genreData} = useMovieGenreQuery();
  console.log('genreData:', genreData);

  const showGenre = (genreIdList) => {
    if (!genreData) return [];

    const genreNameList =  genreIdList.map((id) => {
      const genreObject = genreData.find((genre) => genre.id === id);
      return genreObject.name;
    });

    return genreNameList;
  }
  
  const poster_path = movie.poster_path;
  const imageUrl = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`; 
  // console.log('Image URL:', imageUrl);

  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `${imageUrl}` +
          ")",
      }}
      className="movie-card" 
      onClick={handleCardClick}
    >
      <div className='movie-card-info'>
        <div className="movie-card-badge-container">
            { showGenre(movie.genre_ids).map((genre, index) => (
            <Badge bg="danger" className="movie-card-badge" key={ index }>{ genre }</Badge>
            ))}
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
