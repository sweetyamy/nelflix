import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, useNavigate } from 'react-router-dom';
import './NavbarStyle.css';
import { useLanguage } from '../contexts/LanguageContext'; // 언어 관리 Context 가져오기

const AppLayout = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  
  const { language, toggleLanguage } = useLanguage(); // 전역 언어 상태 및 언어 변경 함수 사용

  const searchByKeyword = (e) => {
    e.preventDefault();
    navigate(`/movies?q=${keyword}`);
    setKeyword('');
  };

  return (
    <div>
      <Navbar expand="lg" variant="dark" bg="black" className="navbar-container">
        <Container fluid>
          <Navbar.Brand href="/">
            <img height={30} className="m-1" src="https://static.vecteezy.com/system/resources/previews/017/396/814/original/netflix-mobile-application-logo-free-png.png" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="/">{language === 'en' ? 'Home' : language === 'fr' ? 'Accueil' : '홈'}</Nav.Link>
              <Nav.Link href="/movies">{language === 'en' ? 'Movies' : language === 'fr' ? 'Films' : '영화'}</Nav.Link>
              
              {/* 언어 선택 드롭다운 */}
              <NavDropdown 
                title={language === 'en' ? 'English' : language === 'fr' ? 'français' : '한국어'} 
                id="navbarScrollingDropdown" 
                className='lang-dropdown'>
                <NavDropdown.Item onClick={() => toggleLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => toggleLanguage('fr')}>français</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => toggleLanguage('ko')}>한국어</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="#" disabled className='nav-membership'>
                {language === 'en' ? 'Membership' : language === 'fr' ? 'Adhésion' : '멤버십'}
              </Nav.Link>
            </Nav>

            {/* 검색 영역 */}
            <Form className="d-flex search-area" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder={language === 'en' ? 'Search' : language === 'fr' ? 'Recherche' : '검색'}
                className="me-2 dark-search"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button variant="outline-danger" type="submit">
                {language === 'en' ? 'Search' : language === 'fr' ? 'Chercher' : '검색'}
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet /> {/* 자식 라우트가 이 위치에 렌더링 */}
    </div>
  );
};

export default AppLayout;