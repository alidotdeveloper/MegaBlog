import React from 'react';
import { useDispatch } from 'react-redux';
import authService from "../../config/conf";
import {logout} from "../../store/authSlice"

function LogoutButton() {
    const dispatch = useDispatch();
    
    const handlerlogout = () => {
        authService.logout().
            then(() => {
                dispatch(logout);
        })
    }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>LogoutButton</button>
  )
}

export default LogoutButton