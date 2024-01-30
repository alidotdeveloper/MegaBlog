import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Authservice } from './appwrite/auth';
import {login,logout} from "./store/authSlice"
import './App.css';
import Header from "../src/Components/Header/Header";
import Footer from "../src/Components/Footer/Footer";
import { Outlet } from 'react-router-dom';
import Home from './pages/Home';



function App() {

  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
  
    Authservice.getCurrentUser()
      .then((userData) => {
        console.log("userdata:", userData);
        if (userData) {
          dispatch(login({userData}))
        } else {
          dispatch(logout())
        }
      })
      .finally(()=>setloading(false))


  },[])
  
  return !loading ? (<div className='bg-gray-400 flex-wrap content-between min-h-screen'>

    <div className='w-full block'></div>
    <Header/>  
    <main>
      Todo : <Outlet />
    </main>
    <Footer/>

  </div>) : null
}

export default App
