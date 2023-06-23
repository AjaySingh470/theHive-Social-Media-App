import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from './localStorageManager';
import axios from 'axios';
import store from '../redux/store';
import { setLoading, showToast } from '../redux/slice/appConfigSlice';
export const axiosClient = axios.create({
    baseURL : process.env.REACT_APP_SERVER_BASE_URL, // Every Time You Creae .env Declare Each Variable With REACT_APP_... 
    withCredentials : true // front end se backend ko cookie nhi bhejega
})
axiosClient.interceptors.request.use(
    (request)=>{
        const access_token = getItem(KEY_ACCESS_TOKEN);
        request.headers['Authorization'] = `Bearer ${access_token}`;
        store.dispatch(setLoading(true));
        return request;
    }
)
axiosClient.interceptors.response.use(
   async (response) =>{
        store.dispatch(setLoading(false));
        const data = response.data;
        if(data.status === "ok")
        {
            return data;
        }
        const originalRequest = response.config;
        const status = data.statusCode;
        const error = data.message;
        
        store.dispatch(showToast({
            type : "ToastFailure",
            message : error,
        }))

        if(status === 401 && !originalRequest._retry)
        {
            originalRequest._retry = true;
            const response = await axios.create({
                withCredentials : true,
            }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
            /////
            // console.log("repone data " + response);

            if(response.data.status === "ok")
            {
                setItem(KEY_ACCESS_TOKEN,response.data.message.accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${response.data.message.accessToken}`;
                return axios(originalRequest);
            }else{
                removeItem(KEY_ACCESS_TOKEN);
                window.location.replace("/login" , "_self");
                return Promise.reject(error);
            }
            // return Promise.reject(error);
        }
        console.log(error);
    }, async (error)=>{
        store.dispatch(setLoading(false));
           
        store.dispatch(showToast({
            type : "ToastFailure",
            message : error,
        }))
        return Promise.reject(error);
    }

);