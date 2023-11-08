import axios from 'axios';

export default async function get_from(url){
    // get important session information such as user name, email, and login status
    axios.defaults.withCredentials = true;
    try{
        const response = await axios.get(url);
        if(response){
           return response.data
        }
    } catch(err){
        console.log(err);
    }
};      