import axios from 'axios';
import get_session from './get_session';

export default async function Logged_in(){
    const session = await get_session( (res, err) => {
        if(session.loggedIn == true){
            return session.loggedIn;
        }
        return session.loggedIn;;
    });
    
};      