import axios from 'axios';

export default async function Get_Events(){
    // get important session information such as user name, email, and login status
    axios.defaults.withCredentials = true;
    try{
        const response = await axios.get("http://localhost:4000/events/get-events");
        if(response){
           return response.data
        }
    } catch(err){
        console.log(err);
    }
};      