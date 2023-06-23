import React, { useEffect , useState } from 'react'
import Avatar from '../Avatar/Avatar'
import './Followers.scss'
import { useDispatch, useSelector } from 'react-redux'
import { followNunfollow } from '../../redux/slice/feedSlice';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../redux/slice/appConfigSlice';

function Followers({user}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feedData = useSelector(state => state.feedDataReducer.feedData);
  const [isFollowing , setIsFollowing] = useState();

  useEffect(()=>{
    if(feedData.followings.find(item => item._id === user._id))
    setIsFollowing(true);
    else{
      setIsFollowing(false);
    }
  },[]);

  function handleUserFollow(){
      dispatch(followNunfollow({
        userIdtoFollow : user._id,
      }))
        dispatch(showToast({
          type : "ToastSuccess",
          message : `${ isFollowing ? "Unfollowed🔴" : "Following🟢" }`
      }))
  }

  return (
    <div className = 'Followers'>
        <div className='user-info' onClick={()=>{navigate(`/profile/${user._id}`)}} >
            <Avatar src={user?.avatar?.url}></Avatar>
            <h4 className='name'>{`${user?.username}`}</h4>
        </div>
        <div className='btn-link' onClick={handleUserFollow} > {isFollowing ? 'Unfollow' : 'Follow' } </div>
    </div>
  )
}

export default Followers