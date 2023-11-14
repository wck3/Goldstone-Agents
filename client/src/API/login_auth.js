import Login_Status from './login_status';
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

export default function Login_Auth(){
    const navigate = useNavigate();
    // check login statss 
    useEffect(() => {
        Login_Status().then((status) => {
            if(status === false){
              navigate('/Login')   
              console.log("Not logged in");
            }
          })
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
}