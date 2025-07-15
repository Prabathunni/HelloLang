import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, Toast } from 'react-bootstrap';
import { LogoutUserAPI } from '../services/appServices';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { toast } from 'react-toastify';

function Header() {
  const { disconnectSocket } = useSocket()
  const { setIsUserLoggedIn, setUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation();

  // Customize title based on current route
  const getTitle = () => {
    if (location.pathname === '/dashboard') return '';
    if (location.pathname === '/myprofile') return 'My Profile';
    if (location.pathname === '/viewuserprofile') return 'User Profile';
    if (location.pathname === '/findfriends') return 'Explore';
    if (location.pathname === '/friendrequests') return 'Friends Requests';
    return '';
  };


  const logoutUser = async () => {
    try {
      const result = await LogoutUserAPI()
      toast.success(result?.data);
      setTimeout(() => {
        sessionStorage.clear()
        setIsUserLoggedIn(false)
        navigate('/')
        setUser([])
        disconnectSocket()
      }, 1000);

    } catch (error) {
      // console.log(error);
      toast.error('Logout Failed!')


    }
  }

  const logginedUSerID = sessionStorage.getItem('userid')

  return (
    <Navbar bg="primary" variant="dark">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand className="fw-bold">{getTitle()}</Navbar.Brand>
        <div>
          <Link to="/dashboard" className="btn btn-outline-light btn-sm me-2">My Friends</Link>
          <Link to={`/myprofile/${logginedUSerID}`} className="btn btn-outline-light btn-sm me-2">My Profile</Link>
          <Link to="/findfriends" className="btn btn-outline-light btn-sm me-2">Explore</Link>
          <Link to="/friendrequests" className="btn btn-outline-light btn-sm me-2">Requests</Link>
          <Button variant="light" size="sm" onClick={logoutUser}>Logout</Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
