import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MyProfile from './pages/MyProfile'
import YourProfile from './pages/YourProfile'
import LayoutWithHeader from './components/LayoutWithHeader'
import FindFriends from './pages/FindFriends'
import FriendRequests from './pages/FriendRequests'
import ChatWithUser from './pages/ChatWithUser'
import Footer from './components/Footer'
import { useAuth } from './contexts/AuthContext'
import { verifyloginAPI } from './services/appServices'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';

function App() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useAuth()

  const verfiyLogin = async () => {
    try {
      const result = await verifyloginAPI();
      // console.log(result);
      const valid = result.data.valid

      if (valid) {
        setIsUserLoggedIn(true)
      } else {
        setIsUserLoggedIn(false)
      }


    } catch (error) {
      console.log(error);
      setIsUserLoggedIn(false)
    }
  }

  useEffect(() => {
    verfiyLogin()
  }, [])

  return (
    <>

      {isUserLoggedIn ?
        <Routes>
          <Route path='*' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />


          <Route element={<LayoutWithHeader />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/chat/:id' element={<ChatWithUser />} />
            <Route path='/myprofile/:id' element={<MyProfile />} />
            <Route path='/viewuserprofile/:id' element={<YourProfile />} />
            <Route path='/findFriends' element={<FindFriends />} />
            <Route path='/friendrequests' element={<FriendRequests />} />
          </Route>
        </Routes>
        :
        <div>
          <Routes>
            <Route path='*' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>

        </div>
      }
      {/* <Footer /> */}



      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />


    </>
  )
}

export default App
