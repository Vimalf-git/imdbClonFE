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
import ResetPassword from './ResetPassword/ResetPassword'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<LandNavBar/>} /> */}
          <Route index element={<><Login /></>} />
          <Route path='/login' index element={<><Login /></>} />
          <Route path='/signup' element={<><Singnup /></>} />
          <Route path='/home' element={<><ProtectedRoute><LandNavBar /><Home /></ProtectedRoute></>} />
          <Route path='/addmovie' element={<><ProtectedRoute><LandNavBar /><AddMovie /></ProtectedRoute></>} />
          <Route path='/watchlist' element={<><ProtectedRoute><LandNavBar/><WatchList/></ProtectedRoute></>}/>
          <Route path='/editmovie/:id' element={<><ProtectedRoute><LandNavBar /><EditMovie /></ProtectedRoute></>} />
          <Route path='/forgotPass' element={<><ForgotPass/></>}/>
          <Route path='/resetpassword/*' element={<><ResetPassword/></>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
