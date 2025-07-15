import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUserApi } from '../services/appServices';
import { toast } from 'react-toastify';


function Register() {

  const navigate = useNavigate();
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');


  const registerUser = async (e) => {
    e.preventDefault()

    try {
      if(!username || !email || !password){
        return toast.warning('Provide all inputs')
      }
      const registerData = {
        username,
        email,
        password
      }

      const result = await RegisterUserApi(registerData);
      toast.success(result?.data.message);
      navigate('/login')
      
      
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message)

      
    }
  }

  return (
      <div className="form-wrapper d-flex align-items-center vh-100 justify-content-center px-3">
    
        <div className="form-card p-4 shadow registerForm-fade-up">
          <h2 className="text-center mb-4 text-primary fw-bold">Create Account</h2>

          <form onSubmit={registerUser}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input type="text" onChange={e=>setUsername(e.target.value)} className="form-control input-field" placeholder="Enter username" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input type="email" onChange={e=>setEmail(e.target.value)} className="form-control input-field" placeholder="Enter email" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input type="password" onChange={e=>setPassword(e.target.value)} className="form-control input-field" placeholder="Enter password" />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-semibold shadow-sm mb-4">
              Sign Up
            </button>
          </form>

          <p>Already Have An Account? <Link to={'/login'} className='text-decoration-none'>Click here</Link> to Login.</p>
          <div className='text-center'>
              <Link className='btn' to={'/'}><i class="fa-solid fa-house"></i></Link>
          </div>
        </div>
      </div>



  )
}

export default Register