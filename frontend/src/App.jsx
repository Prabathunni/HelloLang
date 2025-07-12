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

function App() {

  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>


      <Route element={<LayoutWithHeader/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/chat/:id' element={<ChatWithUser/>}/>
      <Route path='/myprofile/:id' element={<MyProfile/>}/>
      <Route path='/viewuserprofile/:id' element={<YourProfile/>}/>
      <Route path='/findFriends' element={<FindFriends/>}/>
      <Route path='/friendrequests' element={<FriendRequests/>}/>
      </Route>
    </Routes>

    <Footer/>




    </>
  )
}

export default App
