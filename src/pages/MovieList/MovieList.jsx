import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Alert, Container, Spinner, Row, Col } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './MovieListStyle.css';

// 경로 2가지
// nav바에서 클릭해서 온 경우
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌
// install pagination
// page state 만들기
// 페이지네이션 클릭할때마다 page바꿔주기
// 페이지 값이 바뀔때 마다 useSearchMovie에 page까지 넣어서 fetch

const MovieList = () => {

  const[ query ] = useSearchParams();
  
  // page state 만들기
  const [ page, setPage ] = useState(1);

  const keyword = query.get('q')
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  console.log('useSearchMovieQuery data', data);

  const handlePageCliick = ({ selected }) => {
    console.log('page', page);
    setPage(selected + 1);
  };

  if (isLoading) {
    return (
    <div className='spinner-area d-flex justify-content-center align-items-center'>
      <Spinner animation='border' variant='danger' style={{ width: '5rem', height: '5rem' }} />
    </div>
  );
  }

  if (isError) {
    return (
    <Alert variant='danger'>{ error.message }</Alert>
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
              <Col key={ index }>
                <MovieCard movie = { movie } />
              </Col>))}
            </Row>
          </Container>
        </Col>
      </Row>
      
      <Row className='d-flex justify-content-center mt-4'>
        <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        onPageChange={ handlePageCliick }
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
        forcePage={page-1}
        renderOnZeroPageCount={null}
      />
      </Row>
    </Container>
  )
}

export default MovieList
