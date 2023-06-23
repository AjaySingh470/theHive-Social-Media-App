import React , {useState} from 'react'
import './Createpost.scss';
import dummyImg from '../../assets/sample.jpg'
import {BsFillSendFill, BsImage} from 'react-icons/bs'
import {RxCross1} from 'react-icons/rx'
import { axiosClient } from '../../utils/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/slice/postsSlice';
function Createpost() {


  const dispatch = useDispatch();
  const [postImg , setPostImg] = useState("");
  const [caption , setCaption] = useState("");
  const myProfile = useSelector(state => state.appConfigReducer.myProfile);

  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload= ()=>{
      if(fileReader.readyState === fileReader.DONE)
      {
        setPostImg(fileReader.result)
        // console.log(fileReader.result);
      }
    }
  }

  const handlePostSubmit = async()=>{
    try {
      // dispatch(setLoading(true));
      const result = await axiosClient.post('/posts',{
        caption , 
        postImg
      })
      dispatch(getUserProfile({
        userId : myProfile?._id
      }));
      // console.log('post done' , result) 
    } catch (error) {
      console.log(error.message);
    }
    finally{
      // setLoading(false);
      setCaption('');
      setPostImg('');
      
    }
  }

  return (
    <div className = 'createPost' >

        <input type='text' onChange={(e)=>{
          setCaption(e.target.value);
        }} placeholder='Write Something about your image ??' className='caption-details'>
        </input>
          {
            postImg &&
            
        <div className='img-container'>
          <button className='delete-img' onClick={(e)=>{
            e.target.value = null;
            setPostImg("");
          }} ><RxCross1></RxCross1></button>
          <img src={postImg} alt='' className='post-img' ></img>
        </div>
          }
        <div className='input-post'>
            <label htmlFor='inputImg' className='labelImg' >
                  <BsImage></BsImage>
            </label>
            <input
                className='inputImg'
                id='inputImg'
                type='file'
                accept='image/+'
                onChange={handleImageChange}
              >
            
            </input>
            <button className='post-btn btn-style' onClick={handlePostSubmit} ><BsFillSendFill></BsFillSendFill> </button>
        </div>
  

    </div>
  )
}

export default Createpost;