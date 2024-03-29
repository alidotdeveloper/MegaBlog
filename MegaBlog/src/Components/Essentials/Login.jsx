import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import  { Authservice} from "../../appwrite/auth";
import { login as authlogin } from "../../store/authSlice";
import { Button , Input, Logo } from "../index.js";
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Login() {
  const navigte = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState("");
  const login = async (data) => {
    try {
      const session = await Authservice.loginAccount(data);
      if (session) {
        const userData = await Authservice.getCurrentUser()
        console.log('user', userData);
        if (userData) {
          dispatch(authlogin(userData));
          console.log('user approved');
          navigte('/');
        }
      }
    } catch (error) {
      console.error("error is ", error);
      throw error;
      
    }
    
  }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 m-5`}>
      <div className="mb-2 flex justify-center">
      <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
      <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        { 
          { error } && <p className='text-red-600 mt-8 text-center'>{error}</p>
        }
        <form onSubmit= {  handleSubmit(login) } className='mt-3'>
          <div className='space-y-5'>
            <Input
              label="Email"
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: true, validate: {
                  matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)||  "Email address must be a valid address",
              } })}
            />
            
            <Input
              label="Password"
              placeholder="Enter Your password"
              type="password"
              {...register("password", {
                required:true,
              })}
            />
            <Button type = "submit" className="w-full">Sign In</Button>
          </div>

        </form>
     </div>
    </div>
       
  )
}

export default Login