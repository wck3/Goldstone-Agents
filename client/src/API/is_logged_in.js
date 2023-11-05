import get_from from './get_from.js';

export default async function Logged_in(){
    // check if a user is logged in and return the result
    try{ 
        const session = await get_from("http://localhost:4000/users/login");
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