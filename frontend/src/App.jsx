import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MyProfile from './pages/MyProfile'
import YourProfile from './pages/YourProfile'
import LayoutWithHeader from './components/LayoutWithHeader'

function App() {

  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>


      <Route element={<LayoutWithHeader/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/myprofile' element={<MyProfile/>}/>
      <Route path='/viewuserprofile' element={<YourProfile/>}/>

      </Route>
    </Routes>




    </>
  )
}

export default App
