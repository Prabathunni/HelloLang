import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import { loginUserAPI } from '../services/appServices';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';

function Login() {

  const { connectSocket } = useSocket()
  const navigate = useNavigate()
  const { setUser, setIsUserLoggedIn, user } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const loginUser = async (e) => {
    e.preventDefault();

    try {
      if (!username || !password) {
        alert('Provide All Inputs')
      }

      const loginData = {
        username,
        password
      }

      const result = await loginUserAPI(loginData);
      const userID = result?.data.user._id
      const userData = result?.data.user

      if (userID) {
        sessionStorage.setItem('userid', userID)
        sessionStorage.setItem('user', JSON.stringify(userData))


        setUser(userData)
        setIsUserLoggedIn(true)

        alert(result?.data.message)
        navigate('/findFriends')
        connectSocket()

        
      } else {
        console.log("No userId provided");

      }


    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
    }
  }

  console.log(user);
   
  


  return (
    <div className="form-wrapper d-flex align-items-center vh-100 justify-content-center px-3">

      <div className="form-card p-4 shadow registerForm-fade-up">
        <h2 className="text-center mb-4 text-primary fw-bold">Login To Account</h2>

        <form onSubmit={loginUser}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input type="text" onChange={e => setUsername(e.target.value)} className="form-control input-field" placeholder="Enter username" />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)} className="form-control input-field" placeholder="Enter password" />
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