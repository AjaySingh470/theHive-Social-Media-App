import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient';
import './SignUp.scss'
export default function SignUp() {

  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    try {
      const result = await axiosClient.post('/auth/signup',{
        username,
        email,
        password,
      });
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='main'>
        <div className='main-box'>
          <h1>SignUp</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>UserName</label>
              <input placeholder='Username' type="username" className='username' id='username' onChange={(e)=>setUsername(e.target.value)}></input>
              <label htmlFor='email'>Email</label>
              <input placeholder='Email' type="email" className='email' id='email' onChange={(e)=>{setEmail(e.target.value)}} ></input>
              <label htmlFor='Password'>Password</label>
              <input placeholder='Password' type='password' className='password' onChange={(e)=>{setPassword(e.target.value)}} ></input>
              <input type='submit' value='submit' className='submit'></input>
          </form>
          <p>Already Have Account <Link style={{"color":'red'}} to='/login'>Login</Link></p>
        </div>
     
    </div>
  )
}


