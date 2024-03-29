import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Authservice} from '../../appwrite/auth';
import { login } from '../../store/authSlice';
import { Button, Input, Logo } from '../index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';


function Signup() {
    const dispatch = useDispatch();
    const [err, seterror] = useState('');
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
            console.error("Signup Error:", error);
            seterror(error.message || "An error occurred during signup.");
            
        }
    }
  return (
      <div className='flex items-center justify-center w-full'>
          <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 m-5`}>
              <div className='mb-2 flex justify-center'>
              <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                  </span>
                  </div>
                  <h2 className="text-center text-2xl font-bold leading-tight">SignUp to create your account</h2>
      <p className="mt-2 mb-2 text-center text-base text-black/60">
                    Already have any account? &nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                  </p>
            
                  <form onSubmit={handleSubmit(signup)} className='mt-5'>
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
                            required: true })}
                          />
                          <Input
                              label="password"
                              type="password"
                              placeholder="Enter your password"
                              {...register("password", {
                                  required: true,

                              })}
                          />
                          <Button type='submit' className='w-full'>Create Account</Button>

                      </div>
                  </form>                  
         </div>
          </div>
          
   
  )
}

export default Signup