import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import Authservice from './appwrite/auth';
import {login,logout} from "./store/authSlice"
import './App.css';
import Header from "../src/Components/Header/Header";
import Footer from "../src/Components/Footer/Footer";
function App() {

  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    // Check if user is already logged in
    Authservice.getCurrentUser()
      .then((userData) => {
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

    </main>
    <Footer/>

  </div>) : null
}

export default App
