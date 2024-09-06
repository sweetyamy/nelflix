import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Alert, Container, Spinner, Row, Col, Form } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './MovieListStyle.css';

const MovieList = () => {
  const [query] = useSearchParams();
  const navigate = useNavigate(); 

  // Page, sort, and genre states
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState('popularity.desc');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Get search keyword
  const keyword = query.get('q');

  // Fetch movies based on the keyword, page, and sorting option
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page, sortOption });
  
  // Genre options
  const genres = [
    { id: '', name: 'All' }, 
    { id: 28, name: 'Action' }, 
    { id: 35, name: 'Comedy' }
  ]; 

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Handle genre filter change
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  // Handle page change in pagination
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // Redirect if no movies found
  useEffect(() => {
    if (data?.results.length === 0) {
      const timer = setTimeout(() => {
        navigate('/movies');
      }, 2000); 

      return () => clearTimeout(timer); 
    }
  }, [data, navigate]);

  if (isLoading) {
    return (
      <div className='spinner-area d-flex justify-content-center align-items-center'>
        <Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />
      </div>
    );
  }

  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert>;
  }

  if (data?.results.length === 0) {
    return (
      <Container className='d-flex flex-column justify-content-center align-items-center'>
        <Alert variant='warning'>
          No results found for "{keyword}". You will be redirected to the movie list in 2 seconds.
        </Alert>
      </Container>
    );
  }

  // Filter movies by selected genre
  let filteredMovies = data.results;
  if (selectedGenre) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre_ids.includes(parseInt(selectedGenre))
    );
  }

  // Sort movies based on the selected sort option
  if (sortOption === 'popularity.desc') {
    filteredMovies = filteredMovies.sort((a, b) => b.popularity - a.popularity);
  } else if (sortOption === 'popularity.asc') {
    filteredMovies = filteredMovies.sort((a, b) => a.popularity - b.popularity);
  } else if (sortOption === 'vote_average.desc') {
    filteredMovies = filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortOption === 'vote_average.asc') {
    filteredMovies = filteredMovies.sort((a, b) => a.vote_average - b.vote_average);
  }

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center'>
      {/* Sorting and Genre Filtering */}
      <Row className='w-100 mb-3'>
        <Col md={4}>
          <Form.Select aria-label="Sort by" onChange={handleSortChange} value={sortOption}>
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="vote_average.desc">Highest Rated</option>
            <option value="vote_average.asc">Lowest Rated</option>
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Select aria-label="Filter by Genre" onChange={handleGenreChange} value={selectedGenre}>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Movie List */}
      <Row className='w-100'>
        <Col> 
          <Container>
            <Row className='d-flex justify-content-center'>
              {filteredMovies.slice(0, 10).map((movie, index) => (
                <Col key={index}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
      
      {/* Pagination */}
      <Row className='d-flex justify-content-center mt-4'>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          pageCount={data?.total_pages} // total page count
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          forcePage={page - 1}
          renderOnZeroPageCount={null}
        />
      </Row>
    </Container>
  );
};

export default MovieList;
