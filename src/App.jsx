import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandNavBar from './NavBar/LandNavBar'
import Login from './Login/Login'
import Singnup from './SignUp/SignUp'
import Home from './Home/Home'
import AddMovie from './AddMovie/AddMovie'
import EditMovie from './EditMovie/EditMovie'
import WatchList from './watchList/WatchList'
import ForgotPass from './ForgotPassword/ForgotPass'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LandNavBar />} />
          <Route index element={<><Login /></>} />
          <Route path='/login' index element={<><Login /></>} />
          <Route path='/signup' element={<><Singnup /></>} />
          <Route path='/home' element={<><LandNavBar /><Home /></>} />
          <Route path='/addmovie' element={<><LandNavBar /><AddMovie /></>} />
          <Route path='/watchlist' element={<><LandNavBar/><WatchList/></>}/>
          <Route path='/editmovie/:id' element={<><LandNavBar /><EditMovie /></>} />
          <Route path='/forgotPass' element={<><ForgotPass/></>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
