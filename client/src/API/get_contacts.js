import axios from 'axios';

export default async function get_contacts(){
    // get contact information
    axios.defaults.withCredentials = true;
    try{
        const response = await axios.get("http://localhost:4000/contacts/get-contacts");
        if(response){
           return response.data
        }
    } catch(err){
        console.log(err);
    }
};      