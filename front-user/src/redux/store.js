import {configureStore} from '@reduxjs/toolkit'
import appConfigReducer from './slice/appConfigSlice'
import postsReducer from './slice/postsSlice'
import feedDataReducer from './slice/feedSlice'
export default configureStore({
    reducer:{
        appConfigReducer,
        postsReducer,
        feedDataReducer
    }
})