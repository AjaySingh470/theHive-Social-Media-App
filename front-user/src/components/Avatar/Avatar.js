import React from 'react'
import './Avatar.scss';
import user from '../../assets/user.png';
function Avatar({src}) {
  return (
    <div className='profile'>   
        <img src = {src ? src : user} alt="User Proflie"></img>
    </div>
  )
}

export default Avatar;