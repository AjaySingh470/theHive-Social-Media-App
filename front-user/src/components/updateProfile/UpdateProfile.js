import React, { useEffect, useState } from 'react';
import './UpdateProfile.scss';
import dummyuserImg from '../../assets/user.png'
import {MdDelete} from 'react-icons/md'
import {useDispatch, useSelector } from 'react-redux';
import {showToast, updateProfile } from '../../redux/slice/appConfigSlice'

function UpdateProfile() {
  const myProfile = useSelector((state)=>state.appConfigReducer.myProfile);
  const [name , setName] = useState('');
  const [bio , setBio] = useState('');
  const [userImg , setUserimg] = useState();
  const dispatch = useDispatch();
  function handleImageChange(e){
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload= ()=>{
      if(fileReader.readyState === fileReader.DONE)
      {
        setUserimg(fileReader.result)
        // console.log(fileReader.result);
      }
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(updateProfile({
      name,
      bio,
      userImg
    }))
    dispatch(showToast({
      type : "ToastSuccess",
      message : "Profile Updated!!!"
    }))
  }


  useEffect(()=>{
    setName(myProfile?.username || '');
    setBio(myProfile?.bio || '');
    setUserimg(myProfile?.avatar?.url || dummyuserImg);
  },[myProfile]);
  return (
    <div className='UpdateProfile'>
        <div className='left-side'>
          <div className='input-user-img'>
            <label htmlFor='inputImg' className='labelImg' >
              <img src={(userImg !== '') ? userImg : dummyuserImg} alt = {name}></img>
            </label>
            <input type='file' id='inputImg' className='inputImg' accept='image/+' onChange={handleImageChange} ></input>
          </div>
            <h3>D3adlock</h3>
        </div>
        <hr></hr>
        <div className='right-side'>
          <form onSubmit={handleSubmit}>

            <input name='name' value={name} type='text' placeholder='Your Name' onChange={(e)=>setName(e.target.value)} ></input>   
            <input name='name' value={bio} type='text' placeholder='Your Bio' onChange={(e)=>setBio(e.target.value)} ></input>  
            <input className='Update-Profile' name='button' type='submit' placeholder='Update Proflie' value='Update Profile'></input> 
            <button className='Delete-Profile'>Delete My Profile <MdDelete fontSize='24px'></MdDelete></button>
          </form>
        </div> 
    </div>
  )
}

export default UpdateProfile;