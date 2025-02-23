import './App.css'
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import Signup from './Signup';
import Register from './Register';
import Dashboard from './Dashboard';
import PageNotFound from './PageNotFound';
import RefreshHandler from './RefreshHandler';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { useState } from 'react';
import ForgotPassword from './handleForgotPassword';
import ResetPassword from './ResetPassword';
function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);

  const GoogleAuthWrapper=()=>{
    return(
      <GoogleOAuthProvider clientId='291729954550-3vsbsfiseaemj61a51qv2fso9adc76ss.apps.googleusercontent.com'>
        <Register></Register>
      </GoogleOAuthProvider>
    )
  }

  const PrivateRoute=({element})=>{
    return isAuthenticated?element:<Navigate to="/login"/>
  }
  return (
    <div className='app'>
    <BrowserRouter>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/login' element={<GoogleAuthWrapper/>}></Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Navigate to='/login'/>}></Route>
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path='*' element={<PageNotFound/>}></Route>
      
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
