import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import { useState } from 'react';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager';
export default function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSubmit(e){
      e.preventDefault();
    
      try {
        const result = await axiosClient.post('/auth/login',{
          email,
          password
        })
        console.log("Half Login",result);
        setItem(KEY_ACCESS_TOKEN,result.message.accessToken);
        navigate('/')
      } catch (error) {
        console.log(error);
      }
    
    }
    

  return (
    <div className='main'>
        <div className='main-box'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
              <label htmlFor='email'>Email</label>
              <input placeholder='Email' type="email" onChange={(e)=>{
                setEmail(e.target.value);
              }} className='email' id='email'></input>
              <label htmlFor='Password'>Password</label>
              <input placeholder='Password' onChange={(e)=>{
                setPassword(e.target.value)
              }} type='password' className='password' ></input>
              <input type='submit' value='submit' className='submit'></input>
          </form>
          <p>Don't Have An Account <Link to='/signUp'>SignUp</Link></p>
        </div>
     
    </div>
  )
}


