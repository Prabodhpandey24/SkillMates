import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {

  return (
    <div>
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src=""
            width="30"
            height="30"
            className="d-inline-block align-top ms-4"
          />{' '}
          Skill Mates
        </Navbar.Brand>
          <Form className="d-flex mx-auto col-lg-5">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">


          <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavDropdown title="SignIn" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Student</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Teacher</NavDropdown.Item>
              <NavDropdown.Item href="#action5">School</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action6">
                Choose Your Role..
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#action1">SignUp</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header;