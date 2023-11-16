import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = async(e) =>{
    //e.preventDefault();
    const api_url = process.env.REACT_APP_API_URL;
    const LOGOUT_URL = api_url + "users/logout";
    try{
        // post logout request to API
        const response = await axios.post(LOGOUT_URL, { } , { withCredentials: true })
        if(response){
            window.location.href='/login';
        }
    }
    catch (err){
        if(!err.response){
            console.log('No Server Response');
        }
    }
};

export default Logout;
