import axios from "axios";

const Logout = async(e) =>{
    
    e.preventDefault();
    const LOGOUT_URL = "http://localhost:4000/users/logout";
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
