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
import Login_Auth from './API/login_auth';
import ViewUsers from './Admin/view_users';
import EditUser from './Admin/edit_user';
import AddUser from './Admin/add_user';

function App() {  
  // if user is not authenticated, return them to login page
  Login_Auth();

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

       
        <Route exact path="/Admin/EditEvents"  element={<><Navbar/><EditEvents/><Footer/></>} />
        <Route exact path="/Admin/EditTools"  element={<><Navbar/><Docs/><Footer/></>} />
        <Route exact path="/Admin/EditDocs"  element={<><Navbar/><Docs/><Footer/></>} />
        <Route exact path="/Admin/ViewUsers"  element={<><Navbar/><ViewUsers/><Footer/></>}/>
        <Route exact path="/Admin/AddUser"  element={<><Navbar/><AddUser/><Footer/></>}/>
        <Route exact path="/Admin/EditUser/:userID"  element={<><Navbar/><EditUser/><Footer/></>} />
        <Route exact path="/Admin/EditContacts"  element={<><Navbar/><Docs/><Footer/></>} />
         
      </Routes>
    </div>
  );

}

export default App;
