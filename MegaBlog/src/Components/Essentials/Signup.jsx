import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Authservice from '../../appwrite/auth';
import { login } from '../../store/authSlice';
import { Button, Input, Logo } from '../index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';


function Signup() {
    const dispatch = useDispatch();
    const [error, seterror] = useState('');
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const signup = async (data) => {
        seterror("");
        try {

            const userData = await Authservice.createAccount(data);
            if (userData) {
                const getUser = await Authservice.getCurrentUser();
                if (getUser) {
                    dispatch(login(getUser));
                    navigate('/');
                }
            }
            
        } catch (error) {
            seterror(error)
            
        }
    }
  return (
      <div className='flex items-center justify-center w-full'>
          <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
              <div className='mb-2 flex justify-center'>
              <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                  </span>
                  <h2 className="text-center text-2xl font-bold leading-tight">SignUp to create your account</h2>
      <p className="mt-2 text-center text-base text-black/60">
                    Already have any account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                  </p>
                  {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                  <form onSubmit={handleSubmit(signup)}>
                      <div className='space-y-5'>
                          <Input
                              label="Full Name: "
                              placeholder="Enter Your Full Name: "
                              {...register("name", {
                                  required:true
                              })}
                              
                          />
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
                              label="password"
                              type="password"
                              placeholder="Enter your password"
                              {...register("password", {
                                  required: true,

                              })}
                          />
                          <button type='submit' className='w-full'>Create Account</button>

                      </div>
                  </form>
                 
                  


                  
         </div>
          </div>
          
    </div>
  )
}

export default Signup