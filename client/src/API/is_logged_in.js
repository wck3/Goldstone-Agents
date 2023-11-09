import get_from from './get_from.js';

export default async function Logged_in(){
    const api_url = process.env.REACT_APP_API_URL;
    // check if a user is logged in and return the result
    try{ 
<<<<<<< HEAD
        const session = await get_from(api_url + "users/login");
=======
        const session = await get_from("api/users/login");
>>>>>>> 7fa97c9249efcce070d6d5012404b85db3da6db9
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