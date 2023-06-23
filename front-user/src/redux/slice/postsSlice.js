import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
// import { create } from "../../../../server/models/Posts";


export const getUserProfile = createAsyncThunk('users/getUserProfile',async (body,thunkAPI)=>{
    try {
        const response = await axiosClient.post('/users/getUserProfile',body);
        // console.log("userprofiles" , response);
        return response.message;
    } catch (error) {
        return Promise.reject(error);
    }

});

export const likeAndUnlikePost = createAsyncThunk('post/likeAndUnlikePost',async (body,thunkAPI)=>{
    try {
        const response = await axiosClient.post('/posts/like',body);
        // console.log("userprofiles" , response);
        return response.message.post;
    } catch (error) {
        return Promise.reject(error);
    }

});
const postsSlice = createSlice({
    name : 'postsSlice',
    initialState:{
        userProfile : {}
    },
    extraReducers:(builder)=>{
        builder.addCase(getUserProfile.fulfilled, (state,action)=>{
            state.userProfile = action.payload;
        })
        .addCase(likeAndUnlikePost.fulfilled , (state,action)=>{
                const post = action.payload;
                const index = state?.userProfile?.posts?.findIndex((item) => item._id === post._id );
                if( index != undefined && index != -1)
                {
                    state.userProfile.posts[index] = post;
                }
        })
    }
});
export default postsSlice.reducer;

