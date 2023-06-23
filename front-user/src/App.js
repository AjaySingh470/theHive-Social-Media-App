import Login from './pages/login/Login'
import SignUp from './pages/signUp/SignUp';
import toast, { Toaster } from 'react-hot-toast';
import Home from './pages/home/Home';
import { Routes,Route } from 'react-router-dom';
import RequireUser from './components/RequireUser';
import Profile from './components/profile/Profile';
import Feed from './components/feed/Feed';
import LoadingBar  from 'react-top-loading-bar';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import { useSelector } from 'react-redux';
// import { setLoading , appConfigSlice } from '../redux/slice/appConfigSlice';
import { useRef , useEffect } from 'react';
function App() {
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading)
  const toastData = useSelector((state) => state.appConfigReducer.toastData)
  const loadingRef = useRef(null);
  // console.log(isLoading);
  useEffect(() =>{
    if(isLoading)
    {
      loadingRef.current?.continuousStart();
    }
    else{
      loadingRef.current?.complete(); // ? mark se agr loadingref "null" hua to aage ka run nhi hoga..
    }
  },[isLoading]);
  
  useEffect(()=>{
    switch(toastData.type)
    {
      case "ToastSuccess":
        toast.success(toastData.message);
        break;
      case "ToastFailure":
        toast.error(toastData.message);
        break;
      
    }
  },[toastData]);


  return (
    <div className="App">
      <LoadingBar color='cyan' ref = {loadingRef}></LoadingBar>
      <div><Toaster/></div>
      <Routes>
        <Route element={<RequireUser/>}>
          <Route path='/' element={<Home></Home>}>
              <Route path='/' element={<Feed></Feed>}></Route>
              <Route path='/profile/:userId' element={<Profile></Profile>}></Route>
              <Route path='/UpdateProfile' element={<UpdateProfile/>}></Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
      </Routes>
    </div>
  );
}

export default App;
