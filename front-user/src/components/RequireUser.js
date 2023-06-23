import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { KEY_ACCESS_TOKEN , getItem} from '../utils/localStorageManager'

function RequireUser() {

    const user = getItem(KEY_ACCESS_TOKEN);
  // console.log("checking is current")
  return (
     user ? <Outlet/> : <Navigate to = '/login'></Navigate>
  )
}

export default RequireUser