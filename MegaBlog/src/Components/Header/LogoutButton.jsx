import React from 'react';
import { useDispatch } from 'react-redux';
import {logout as lg} from "../../appwrite/auth";
import {logout} from "../../store/authSlice"

function LogoutButton() {
    const dispatch = useDispatch();
    
    const handlerlogout = () => {
        lg()
            .then(() => {
                dispatch(logout());
        })
    }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={handlerlogout}>Logout</button>
  )
}

export default LogoutButton