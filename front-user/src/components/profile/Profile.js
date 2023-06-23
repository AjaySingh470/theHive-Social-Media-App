import React, { useEffect, useState } from 'react'
// import Avatar from '../Avatar/Avatar';
import Posts from '../Posts/Posts';
import './Proflie.scss'
import userImg from '../../assets/user.png';
import { useNavigate, useParams } from 'react-router-dom';
import Createpost from '../CreatePosts/Createpost'
import { followNunfollow } from '../../redux/slice/feedSlice';

import { useDispatch, useSelector } from 'react-redux';
import {  getUserProfile } from '../../redux/slice/postsSlice';
function Profile() {
  const navigate = useNavigate();

  const params = useParams();
  const userProfile  = useSelector(state => state.postsReducer.userProfile);
  const myProfile = useSelector (state => state.appConfigReducer.myProfile);
  const feedData = useSelector(state => state.feedDataReducer.feedData);
  const dispatch = useDispatch();
  const [isMyProfile , setIsMyProfile] = useState(false);
  const [isFollowing , setIsFollowing] = useState(false);
  useEffect(()=>{
    dispatch(getUserProfile({
      userId : params.userId
    }))
    

    if(feedData?.followings?.find(item => item._id === params.userId))
    setIsFollowing(true);
    else{
      setIsFollowing(false);
    }
    setIsMyProfile(myProfile?._id === params.userId);
  },[myProfile , params.userId , feedData]);
  
  //////////////////////////////////////////

  function handleUserFollow(){
    dispatch(followNunfollow({
      userIdtoFollow : params.userId,
    }))
  }

  //////////////////////////////////////////

  return (
    <div className='Profile'>
      <div className='container'>
        <div className='center'>
          { isMyProfile && <Createpost></Createpost>  }
          {
            userProfile?.posts?.map(post =>  <Posts post = {post} key={post._id} ></Posts>)
          }
        </div>
      <div className='right'>
          <div className='user-info'>
            <img src={userProfile?.avatar?.url ? userProfile?.avatar?.url : userImg} alt="userImg"></img>
            <div className='name'><p>{userProfile?.username}</p></div>
          </div>
          <div className='follower-info'>
            <h4>{`${userProfile?.followers?.length} Followers`}</h4>
            <hr></hr>
            <h4>{`${userProfile?.followings?.length} Followings`}</h4>
          </div>
        { isMyProfile && <button className='follow' onClick={()=>navigate('/UpdateProfile')}>UpdateProfile</button>}
        { !isMyProfile &&  <button onClick={handleUserFollow} className='follow'>{ isFollowing ? "Following" : "Follow"  }</button>}
      </div>
      </div>
    </div>
  )
}

export default Profile;