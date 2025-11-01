import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import { setAuthUser, removeAuthUser } from './store/slices/authUserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthToken } from './utils/userAuth.jsx';
import { useEffect } from 'react';
import Login from './components/pages/login'
import Layout from './components/common/Layout';
import Signup from './components/pages/signup';
import { ToastContainer } from 'react-toastify';
import Profile from './components/pages/profile.jsx';
import Feeds from './components/pages/feeds.jsx';
import Networks from './components/pages/networks.jsx';
import ConnectionReqs from './components/pages/connectionReqs.jsx';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorizedUser = useSelector((state) => state.authUser && Object.keys(state.authUser).length > 0);

  async function setIsUserData() {
    const authData = await checkAuthToken();
    return authData
  }

  useEffect(() => {
    setIsUserData().then((data)=>{
      if(!data || !data.isAuthorized){
        dispatch(removeAuthUser());
        return false;
      } else {
        dispatch(setAuthUser(data.userData));
        return true;
      }
    }).then((isAuthorized) => {
      const currentPath = location.pathname;
      if(!isAuthorized && currentPath !== '/login'){
        navigate('/login');
      }
      else if(isAuthorized && (currentPath === '/login' || currentPath === '/')){
        navigate('/feed');
      }
      else if(!isAuthorized && currentPath === '/'){
        navigate('/login');
      }
    })
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/feed' element={<Feeds/>} />
          <Route path='/networks' element={<Networks/>} />
          <Route path='/requests' element={<ConnectionReqs/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/*' element={isAuthorizedUser?<Navigate to="/feed"/>:<Navigate to="/login"/>} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App;
