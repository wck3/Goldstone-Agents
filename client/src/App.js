import './App.css';
import Navbar from './Components/nav';
import {Route, Routes, Navigate, useLocation, useNavigate} from 'react-router-dom';
import Tools from './Pages/Tools';
import Home from './Pages/Home';
import Login from './Pages/Login';
import NotFound from './Components/404';
import { useEffect } from 'react';
import Logged_in from './helpers/get_session';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    Logged_in().then((status) => {
        if(status.loggedIn === false){
          navigate('/Login')   
        }
      })
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<><Navbar/><Home/></>} />
        <Route exact path="/Tools"  element={<><Navbar/><Tools/></>} />
        <Route exact path="/Login" element={<Login/>} />
        <Route exact path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );

}

export default App;
