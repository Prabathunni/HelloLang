import React from 'react';
import './homepage.css';
import { Link } from 'react-router-dom'
import logo from '../assets/logo-hl.png'

function Home() {
  return (
    <div className="homepage-bg d-flex align-items-center justify-content-center vh-100 text-white">
      <div className="text-center">

        <img src={logo}
          alt="HelloLang Logo"
          className="logo animate-fade-up animate-delay-0 mb-md-3"
        />

        <h1 className="HEAD1 animate-fade-up animate-delay-1  mb-md-3">
          Welcome to <span>HelloLang</span>
        </h1>

        <p className="lead mb-4 animate-fade-up animate-delay-2">
          Connect. Chat. Learn. Master new languages with real people across the globe
        </p>

        <Link to="/register" className="btn btn-primary btn-sm px-2 py-1 shadow animate-fade-up animate-delay-2">
          Get Started <i class="fa-regular fa-comments ms-1 fa-bounce"></i>
        </Link>

      </div>
    </div>);
}

export default Home;
