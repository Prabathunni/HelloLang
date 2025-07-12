import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';

function Header() {
  const location = useLocation();

  // Customize title based on current route
  const getTitle = () => {
    if (location.pathname === '/dashboard') return 'Dashboard';
    if (location.pathname === '/myprofile') return 'My Profile';
    if (location.pathname === '/viewuserprofile') return 'User Profile';
    return '';
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand className="fw-bold">{getTitle()}</Navbar.Brand>
        <div>
          <Link to="/dashboard" className="btn btn-outline-light btn-sm me-2">Home</Link>
          <Link to="/myprofile" className="btn btn-outline-light btn-sm me-2">My Profile</Link>
          <Button variant="light" size="sm" onClick={() => alert("Logging out...")}>Logout</Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
