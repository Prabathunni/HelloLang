import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'


function Login() {
  return (
      <div className="form-wrapper d-flex align-items-center vh-100 justify-content-center px-3">
    
        <div className="form-card p-4 shadow registerForm-fade-up">
          <h2 className="text-center mb-4 text-primary fw-bold">Login To Account</h2>

          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input type="text" className="form-control input-field" placeholder="Enter username" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input type="password" className="form-control input-field" placeholder="Enter password" />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-semibold shadow-sm mb-4">
              Sign In
            </button>
          </form>

          <p>Don't Have An Account? <Link to={'/register'} className='text-decoration-none'>Click here</Link> to Register.</p>
          <div className='text-center'>
              <Link className='btn' to={'/'}><i class="fa-solid fa-house"></i></Link>
          </div>
        </div>
      </div>
  )
}

export default Login