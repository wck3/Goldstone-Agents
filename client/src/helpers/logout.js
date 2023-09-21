import axios from "axios";

const Logout = async(e) =>{
    
    e.preventDefault();
    const LOGOUT_URL = "http://localhost:4000/users/logout";
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
