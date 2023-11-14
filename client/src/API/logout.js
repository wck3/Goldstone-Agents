import axios from "axios";

const Logout = async(e) =>{
    e.preventDefault();
    const api_url = process.env.REACT_APP_API_URL;
    const LOGOUT_URL = api_url + "/users/logout";
    window.location.href='/login';
    try{
        // post logout request to API
        await axios.post(LOGOUT_URL, { } , { withCredentials: true })
    }
    catch (err){
        if(!err.response){
            console.log('No Server Response');
        }
    }
};

export default Logout;
