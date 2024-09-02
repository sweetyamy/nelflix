import React from 'react'
import { Container,Nav, Navbar, NavDropdown, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import './NavbarStyle.css';

const AppLayout = () => {
  return (
    <div>
    <Navbar expand="lg" variant="dark" bg="black" className="navbar-container">
      <Container fluid>
        <Navbar.Brand href="/"><img height={30} className="m-1" src="https://static.vecteezy.com/system/resources/previews/017/396/814/original/netflix-mobile-application-logo-free-png.png" alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/movies">Movies</Nav.Link>
            <NavDropdown title="English" id="navbarScrollingDropdown" className='lang-dropdown'>
              <NavDropdown.Item href="/movies">English</NavDropdown.Item>
              <NavDropdown.Item href="/movies">
              français
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                한국어
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled className='nav-membership'>
              Membership
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 dark-search"
              aria-label="Search"
            />
            <Button variant="outline-danger">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet /> {/* 자식 라우트가 이 위치에 렌더링 */}
    </div>
  )
}

export default AppLayout
