import axios from 'axios';
import get_session from './get_session';

export default async function Logged_in(){
    // check if a user is logged in and return the result

    const session = await get_session( );
    
    if(session.loggedIn == true){
        return session.loggedIn;
    }


    return session.loggedIn;
};      