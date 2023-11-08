import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Navbar from './Components/nav';
import Footer from './Components/footer';
import Events from './Pages/Events';
import Tools from './Pages/Tools';
import Docs from './Pages/Docs';
import Contacts from './Pages/Contacts';
import Account from './Pages/Account';
import Login from './Pages/Login';
import NotFound from './Components/404';
import Edit_Events from './Admin/edit_events';
import { useEffect, useState } from 'react';
import Logged_in from './API/is_logged_in';
import get_from from './API/get_from';

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

  const [role, setRole] = useState('');
  useEffect(() => {

    async function fetchSession() {
        try {
            // fetch all tools to display
            const session = await get_from("http://localhost:4000/users/login");
            setRole(session.user.role);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    fetchSession();
}, []);



  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<><Navbar/><Events/><Footer/></>} />
        <Route exact path="/Tools"  element={<><Navbar/><Tools/><Footer/></>} />
        <Route exact path="/Documents"  element={<><Navbar/><Docs/><Footer/></>} />
        <Route exact path="/Contacts"  element={<><Navbar/><Contacts/><Footer/></>} />
        <Route exact path="/Account"  element={<><Navbar/><Account/><Footer/></>} />
        <Route exact path="/Login" element={<Login/>} />
        <Route exact path='*' element={<NotFound/>} />

        {role === "Admin" && (
          <>  
          <Route exact path="Admin/Edit-Events"  element={<><Navbar/><Edit_Events/><Footer/></>} />
          <Route exact path="Admin/Edit-Tools"  element={<><Navbar/><Docs/><Footer/></>} />
          <Route exact path="Admin/Edit-Docs"  element={<><Navbar/><Docs/><Footer/></>} />
          <Route exact path="Admin/View-Users"  element={<><Navbar/><Docs/><Footer/></>} />
          <Route exact path="Admin/Edit-Contacts"  element={<><Navbar/><Docs/><Footer/></>} />
          </>
        
        )}
      </Routes>
    </div>
  );

}

export default App;
