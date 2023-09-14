import logo from './logo.svg';
import './App.css';
import Navbar from './Components/nav';
import {Route, Routes} from 'react-router-dom';
import Tools from './Pages/Tools';
import Home from './Pages/Home';
import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
      {window.location.pathname !== '/login'}
      <Navbar/>
      {}
      <Routes>
        <Route path="/Login" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Tools"  element={<Tools/>} />
      </Routes>
    </div>
  );
}

export default App;
