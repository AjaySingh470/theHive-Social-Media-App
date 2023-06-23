import React, { useEffect } from 'react'
import Followers from '../Followers/Followers'
import Posts from '../Posts/Posts'
import './Feed.scss'
import Createpost from '../CreatePosts/Createpost'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slice/feedSlice'
// import Followers from '../Followers/Followers'

function Feed() {

  const dispatch = useDispatch();
  const feedData = useSelector(state => state.feedDataReducer.feedData);
  useEffect(()=>{
    dispatch(getFeedData());
  },[ dispatch])


  return (
    <div className='Feed'>
        <div className='container'>
            
            <div className='center'>
             { feedData?.posts?.map(post => <Posts  post={post} key={post._id}></Posts>)};
            </div>
            <div className='right'>
              <div className='followings'>
                <h3 className='heading'>Followings</h3>
                {
                  feedData?.followings?.map(user => <Followers key={user._id} user={user} ></Followers> )
                }
              </div>
              <div className='suggestions'>
                <hr></hr>
              <h3 className='heading'>Suggestions</h3>
                {
                  feedData?.suggestions?.map(user => <Followers key={user._id} user={user} ></Followers> )
                }
              </div>
            </div>
        </div>
    </div>
  )
}

export default Feed