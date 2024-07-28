import './App.css'
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import {Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {

  const {authUser} = useAuthContext();

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
     <Routes>
      
       <Route path ='/' element={authUser ? <Home /> : <Navigate to = {"/login"}/>} /> {/*here in case
       of logout authuser is null due to which we will navigate to the login page */}
       <Route path ='/login' element={authUser ? <Navigate to ='/' /> : <Login />} />
       <Route path ='/signup' element={authUser ? <Navigate to ='/' /> : <SignUp />} />  {/* when user 
       is authenticated go to home page if not authenticated then go to signup page */}
    
     </Routes>
     <Toaster />
    </div>
  );
}

export default App;


