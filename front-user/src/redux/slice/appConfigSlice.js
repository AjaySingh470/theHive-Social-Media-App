import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
// import { create } from "../../../../server/models/Posts";


export const getMyInfo = createAsyncThunk('users/getMyInfo',async (body,thunkAPI)=>{
    try {
      
        const response = await axiosClient.get('/users/getMyInfo');
        // console.log("user data->",response.message);
        return response.message;
    } catch (error) {
        return Promise.reject(error);
    }
    

});

export const updateProfile = createAsyncThunk('users/updateProfile',async(body,thunkAPI)=>{
    try {
     
        const response = await axiosClient.put("/users/",body);
        // console.log("thunk se updatedd")
        return response.message;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
  
})

const appConfigSlice = createSlice({
    name : 'appConfigSlice',
    initialState:{
        isLoading : false,
        myProfile : null,
        toastData : {}
    },
    reducers:{
        setLoading : (state,action)=>{
            state.isLoading = action.payload;
        },
        showToast : (state,action)=>{
            state.toastData = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getMyInfo.fulfilled, (state,action)=>{
            state.myProfile = action.payload.user;
        })
        .addCase(updateProfile.fulfilled , (state,action)=>{

        })
    }
});
export default appConfigSlice.reducer;

export const {setLoading , showToast } = appConfigSlice.actions;
