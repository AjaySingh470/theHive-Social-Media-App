import React from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN , removeItem } from '../../utils/localStorageManager';
import {TbLogout} from 'react-icons/tb';
import './NavBar.scss';
import { useDispatch, useSelector } from 'react-redux';
export default function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const loadingRef = useRef();
    const myProfile = useSelector(state => state.appConfigReducer.myProfile); 
    async function handleLogout(){
        try {
			await axiosClient.post('/auth/logout');
			removeItem(KEY_ACCESS_TOKEN);
			navigate('/login')
		} catch (e) {
			console.log(e);
		}
    }

  return (
    <div className='NavBar'>
        
        <div className='container'>
            <div className='logo' onClick={()=>{navigate('/')}}>
                theH<span style={{"color":'yellow'}}>i</span>ve
            </div>
            <div className='right-side'>
                <div className='profile' onClick={()=>{navigate(`/profile/${myProfile._id}`)}}>
                    <Avatar src = {myProfile?.avatar?.url} ></Avatar>
                </div>
                <div className='logout' onClick={handleLogout}><p>LogOut <TbLogout></TbLogout></p></div>
            </div>
        </div>

    </div>
  )
}
