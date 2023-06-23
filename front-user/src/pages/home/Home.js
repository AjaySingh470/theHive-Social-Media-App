import React from 'react'
// import { axiosClient } from '../../utils/axiosClient'
import { useEffect } from 'react';
import './Home.scss'
import NavBar from '../../components/Navbar/NavBar';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMyInfo } from '../../redux/slice/appConfigSlice';
function Home() {
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getMyInfo());
    },[])
  return (
    <div className='Home'>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  )
}

export default Home