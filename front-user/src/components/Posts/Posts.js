import React from 'react'
import Avatar from '../Avatar/Avatar'
import './Posts.scss'
import { AiFillHeart, AiOutlineHeart ,} from "react-icons/ai";
import saple from '../../assets/sample.jpg'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { likeAndUnlikePost } from '../../redux/slice/postsSlice';
import { showToast } from '../../redux/slice/appConfigSlice';
function Posts({post}) {

  // console.log(post?.caption);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handlePostLike(){
    dispatch(showToast({
      type : "ToastSuccess",
      message : `${post.isLiked ? "You Disliked " : "You Liked this post❤️"}`
    }))
    dispatch(
      likeAndUnlikePost({
        postId : post._id,
      }
      ))
  }


  return (
    <div className='Posts'>
          <div className='prof' onClick={()=> navigate(`/profile/${post.owner._id}`)} >
            <Avatar src={post?.owner?.avatar?.url}></Avatar>
           {`${post?.owner?.name}`}
          </div>
          <div className='pic'>
            <img src={post?.image?.url} alt = "User Posts "/>
          </div>
          <div className='foter'>
            <div className='likes' onClick={handlePostLike}>
              {
                post.isLiked ? <AiFillHeart style={{
                  color:'white',
                  fontSize : '27px'
                }} ></AiFillHeart> : <AiOutlineHeart style={{
                  color:'white',
                  fontSize : '27px'
                }} ></AiOutlineHeart>
              }
           {`${post?.likesCount}` }
            </div>
            
            <div className='caption'>{`${post?.caption}`}</div>
            <h6 className='time-post'>{`${post?.timeAgo}`} ago</h6>

          </div>
    </div>
  )
}

export default Posts;