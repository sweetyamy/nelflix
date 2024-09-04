import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Alert, Container, Spinner, Row, Col } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './MovieListStyle.css';

const MovieList = () => {
  const [query] = useSearchParams();
  const navigate = useNavigate(); // Use navigate hook to handle redirection

  // page state 만들기
  const [page, setPage] = useState(1);

  const keyword = query.get('q');
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  console.log('useSearchMovieQuery data', data);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // no moviies found
  useEffect(() => {
    if (data?.results.length === 0) {
      const timer = setTimeout(() => {
        navigate('/movies'); // Navigate back to the movie list page
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
    return (
      <Alert variant='danger'>{error.message}</Alert>
    );
  }

  // Check if there are no results
  if (data?.results.length === 0) {
    return (
      <Container className='d-flex flex-column justify-content-center align-items-center'>
        <Alert variant='warning'>
          No results found for "{keyword}". You will be redirected to the movie list in 2 seconds.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center'>
      <Row>
        <Col>
          sorting
        </Col>
      </Row>
      <Row className='w-100'>
        <Col> 
          <Container>
            <Row className='d-flex justify-content-center'>
              {data?.results.slice(0, 10).map((movie, index) => (
                <Col key={index}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
      
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
