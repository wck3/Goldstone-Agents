import React from 'react';
import { useRef, useState, useEffect } from "react";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styles from "./Login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../Media/Gold_slogan.png'


// User Regex for validation

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.+[a-zA-Z]{3,23}$/;
//const REGISTER_URL = 'http://localhost:4000/users/register';
const REGISTER_URL = 'http://localhost:4000/users/login';

function Login (){
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
      
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // prevent js hacking
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        /*if(!v1 || !v2 ){
            setErrMsg("Invalid Entry");
            return;
        }*/

        try{
            const response =  await axios.post(REGISTER_URL, 
                JSON.stringify({email, pwd}),{
                    headers : {'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data, "it worked!");
            setSuccess(true);
    
        } catch (err){
            if(!err?.response){
                setErrMsg('No Server Response');
            }
            else if(err.response?.status === 409){
                setErrMsg('incorrect Credentials');
            }
            else{
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }

     

        setEmail('');
        setPwd('');
        //window.location.replace("http://localhost:3000/Home");
        /*if(success === 'True'){

           window.location.replace("http://localhost:3000/");
          
        } */ 
      
        
    }


    return (
        <div className="Login">
            <div className='login-form'>
                <p ref={errRef} className={errMsg ? styles.errmsg : "hide"}>{errMsg}</p>
                <h1>Welcome</h1>
                <h2>PLEASE LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        required
                        type="email"
                        ref={userRef}
                        id="email" 
                        autoComplete="off" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        placeholder='EMAIL'
                    />
                
                    <input 
                        required 
                        type="password" 
                        id="pwd"  
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        placeholder='PASSWORD'
                    />
                    <button>SIGN IN</button>
                </form>
            </div>
            
            <div className='login-graphic' >
                <div className="background" style={{backgroundImage: 'url(' + require('../Media/drone_img.jpg') + ')'}}></div>
                <img  className="logo" src={logo} alt="Goldstone Hub"/>
            </div>
        </div>
    )
}

export default Login;