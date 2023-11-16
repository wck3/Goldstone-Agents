import axios from 'axios';

export default async function get_from(url){
    // get important session information such as user name, email, and login status
    try{
        const response = await axios.get(url, {withCredentials: true});
        if(response){
           return response.data
        }
    } catch(err){
        console.log(err);
    }
};      