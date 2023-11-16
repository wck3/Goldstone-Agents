import './App.css';
import {Route, Routes} from 'react-router-dom';
import Navbar from './Components/nav';
import Footer from './Components/footer';
import Events from './Pages/Events';
import Tools from './Pages/Tools';
import Docs from './Pages/Docs';
import Contacts from './Pages/Contacts';
import Account from './Pages/Account';
import Login from './Pages/Login';
import NotFound from './Components/404';
import EditEvents from './Admin/edit_events';
import { useEffect, useState } from 'react';
import get_from from './API/get_from';
import Login_Auth from './API/login_auth';

function App() {
  const api_url = process.env.REACT_APP_API_URL;
  
  // if user is not authenticated, return them to login page
  Login_Auth();

  // get the role of the user from their session
  const [role, setRole] = useState('');
  useEffect(() => {
    async function fetchSession() {
        try {
            const session = await get_from(api_url + "users/login");
            if(session.user){
              setRole(session.user.role);
            }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    fetchSession();
   // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Route exact path="Admin/Edit-Events"  element={<><Navbar/><EditEvents/><Footer/></>} />
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
