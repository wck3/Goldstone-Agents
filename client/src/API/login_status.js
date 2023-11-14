import get_from from './get_from.js';

export default async function Login_Status(){
    const api_url = process.env.REACT_APP_API_URL;
    // check if a user is logged in and return the result
    try{ 
        const session = await get_from(api_url + "users/login");
        if(session.loggedIn !== undefined && session.loggedIn === true){
            return true;
        }
        else{
            return false;
        }
    }
    catch{   
        return false;
    }
};      