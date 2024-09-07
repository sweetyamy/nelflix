import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Modal, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useMovieDetailsQuery } from '../../hooks/useMovieDetails';
import { useMovieTrailerQuery } from '../../hooks/useMovieTrailer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faSquarePollVertical, faCircleUser, faPlayCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './MovieDetailStyle.css';
import Reviews from '../Homepage/components/Reviews/Reviews';

const MovieDetail = () => {
  const { id } = useParams();
  const { data: movie, error, isLoading } = useMovieDetailsQuery(id);
  const { data: genreData } = useMovieGenreQuery();
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch the movie trailer
  const { data: trailer, isTrailerLoading, error: trailerError } = useMovieTrailerQuery(id);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile view for width <= 768px
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isLoading) {
    return (
      <div className='spinner-area d-flex justify-content-center align-items-center'>
        <Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />
      </div>
    );
  }

  if (error) {
    return <div>Error loading movie details</div>;
  }

  if (!movie) {
    return <div>No movie details available</div>;
  }

  const showGenre = (genreIdList) => {
    if (!genreData) return [];

    return genreIdList.map((id) => {
      const genreObject = genreData.find((genre) => genre.id === id);
      return genreObject ? genreObject.name : 'Unknown';
    });
  };

  const handlePlayClick = () => {
    if (trailer) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const poster_path = movie.poster_path;
  const imageUrl = `https://image.tmdb.org/t/p/w400${poster_path}`;

  const truncatedOverview = movie.overview.length > 200 
    ? movie.overview.substring(0, 200) + '...'
    : movie.overview;

  const toggleReviewExpansion = () => {
    setIsReviewExpanded(!isReviewExpanded);
  };

  return (
    <Container>
      <Row>
        <Col lg={4} sm={12} className="movie-detail-img-area">
          {/* 모바일에서는 트레일러를 우선적으로 보여줌 */}
          {isMobile && trailer ? (
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img src={imageUrl} alt={movie.title} className="movie-detail-img" />
          )}

          {/* Play button only for desktop view */}
          {!isMobile && trailer && (
            <FontAwesomeIcon
              icon={faPlayCircle}
              className="play-button"
              onClick={handlePlayClick}
            />
          )}
        </Col>

        <Col lg={8} sm={12}>
          <div className="movie-card-badge-container">
            {movie.genre_ids && showGenre(movie.genre_ids).map((genre, index) => (
              <Badge bg="danger" className="movie-card-badge" key={index}>{genre}</Badge>
            ))}
          </div>

          <h1>{movie.title}</h1>
          <h4>{movie.tagline}</h4>
          <div className='movie-card-txt'>
            <span className='mr-3'>
              <FontAwesomeIcon icon={faSquarePollVertical} className='movie-card-ico-vote' />
              Vote : {parseFloat(movie.vote_average).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span className='mr-3'>
              <FontAwesomeIcon icon={faFire} className='movie-card-ico-fire' />
              Popularity : {parseFloat(movie.popularity).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span className='mr-3'>
              <FontAwesomeIcon icon={faCircleUser} className='movie-card-ico-user' />
              {movie.adult ? "Adult" : "Under 18"}
            </span>
          </div>
          
          <hr />
          <p>
            {isReviewExpanded ? movie.overview : truncatedOverview}
            <button onClick={toggleReviewExpansion} className="btn btn-link">
              {isReviewExpanded ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
            </button>
          </p>
          <hr />

          <p><a href={`http://${movie.homepage}`} target="_blank" rel="noopener noreferrer">{movie?.homepage}</a></p>
          <p>* Released : {movie?.release_date || null}</p>
          {movie.runtime && (<p>* Runtime : {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60} mins`}</p>)}
          {movie.revenue && (<p>* Revenue : {parseFloat(movie.revenue).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>)}
        </Col>
      </Row>

      <Row>
        <Col>
          <hr />
          <Reviews movieId={id} />
        </Col>
      </Row>

      {/* Modal to show the YouTube trailer */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isTrailerLoading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" variant="danger" />
            </div>
          ) : trailerError ? (
            <p>Error loading trailer</p>
          ) : (
            trailer && (
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MovieDetail;
