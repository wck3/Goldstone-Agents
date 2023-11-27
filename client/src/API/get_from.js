import axios from 'axios';

export default async function get_from(url, param_data){
    // get important session information such as user name, email, and login status
    //console.log(param_data)
    try{
        var response;
        if(param_data){
            response = await axios.get(url, {withCredentials: true, params : param_data });
        }
        else{
            response = await axios.get(url, {withCredentials: true});
        }
        
        if(response){
           return response.data
        }
    } catch(err){
        console.log(err);
    }
};      