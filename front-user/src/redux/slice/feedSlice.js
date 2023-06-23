import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
// import { create } from "../../../../server/models/Posts";
import { setLoading } from "./appConfigSlice";
import { likeAndUnlikePost } from "./postsSlice";


export const getFeedData = createAsyncThunk('users/getFeedData',async (_,thunkAPI)=>{
    try {
        const response = await axiosClient.get('/users/getFeedData',);
        // console.log("userprofiles" , response);
        return response.message;
    } catch (error) {
        return Promise.reject(error);
    }
  

});

export const followNunfollow = createAsyncThunk('users/followNunfollow', async (body , thunkAPI) =>{
    try {
        
        const response = await axiosClient.post('/users/follow',body);
        return response.message.user;
    } catch (error) {
        return Promise.reject(error);
    }
    finally{
        
    }
})

const feedSlice = createSlice({
    name : 'feedSlice',
    initialState:{
        feedData : {}
    },
    extraReducers:(builder)=>{
        builder.addCase(getFeedData.fulfilled, (state,action)=>{
            state.feedData = action.payload;
        })
        .addCase(likeAndUnlikePost.fulfilled , (state,action)=>{
                const post = action.payload;
                const index = state?.feedData?.posts?.findIndex((item) => item._id === post._id );
                
                if( index !== undefined &&  index !== -1)
                {
                    state.feedData.posts[index] = post;
                }
        })
        .addCase(followNunfollow.fulfilled , (state,action)=>{
            const user = action.payload;
            const idx = state?.feedData?.followings?.findIndex(item=>item._id === user._id)
            const idx2 = state?.feedData?.suggestions?.findIndex(item=>item._id === user._id)
            if(idx !== -1)
            {
                state?.feedData?.followings?.splice(idx,1);
                state?.feedData?.suggestions?.push(user);
            }
            else{
                state?.feedData?.followings?.push(user);
                state?.feedData?.suggestions?.splice(idx2,1);

            }

        } )
        
    }
});
export default feedSlice.reducer;

