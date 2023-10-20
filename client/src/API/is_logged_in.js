import get_session from './get_session';

export default async function Logged_in(){
    // check if a user is logged in and return the result
    try{ 
        const session = await get_session();
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