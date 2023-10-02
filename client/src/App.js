import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Navbar from './Components/nav';
import Footer from './Components/footer';
import Home from './Pages/Home';
import Tools from './Pages/Tools';
import Docs from './Pages/Docs';
import Contacts from './Pages/Contacts';
import Account from './Pages/Account';
import Login from './Pages/Login';
import NotFound from './Components/404';
import { useEffect } from 'react';
import Logged_in from './API/is_logged_in';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    Logged_in().then((status) => {
        if(status === false){
          navigate('/Login')   
          console.log("Not logged in");
        }
      })
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<><Navbar/><Home/></>} />
        <Route exact path="/Tools"  element={<><Navbar/><Tools/></>} />
        <Route exact path="/Documents"  element={<><Navbar/><Docs/></>} />
        <Route exact path="/Contacts"  element={<><Navbar/><Contacts/></>} />
        <Route exact path="/Account"  element={<><Navbar/><Account/></>} />
        <Route exact path="/Login" element={<Login/>} />
        <Route exact path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );

}

export default App;
