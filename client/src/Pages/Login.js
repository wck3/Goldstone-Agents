import React from 'react';
import { useRef, useState, useEffect } from "react";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styles from "./Login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

// User Regex for validation

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.+[a-zA-Z]{3,23}$/;
const REGISTER_URL = '/register';

function Register (){
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [pwd, setPwd] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        //console.log(result);
        //console.log(email);
        if(result){
            setValidEmail(email);
        }
        else{
            setValidEmail(null);
        }
   
    
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        //console.log(result);
        //console.log(pwd);
        if(result){
            setValidPwd(pwd);
        }
        else{
            setValidPwd(null);
        }
      
    }, [pwd]);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // prevent js hacking
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2 ){
            setErrMsg("Invalid Entry");
            return;
        }

        try{
            const response =  await axios.post(REGISTER_URL, 
                JSON.stringify({email, pwd}),{
                    headers : {'Content-Type': 'applications/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);
            setSuccess(true);
    
        } catch (err){
            if(!err?.response){
                setErrMsg('No Server Response');
            }
            else if(err.response?.status === 409){
                setErrMsg('Username or Email Taken');
            }
            else{
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    }
    return (
        <div class="Login">

            <div className='login-graphic'>
                <h1>hi</h1>
            </div>
        
            <section>
                <p ref={errRef} className={errMsg ? styles.errmsg : "hide"}>{errMsg}</p>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    
                    <label htmlFor="email">Email</label>
                    <input 
                        required
                        type="email" 
                        id="email" 
                        autoComplete="off" 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                
                    <label htmlFor="password">Password</label>
                    <input 
                        required 
                        type="password" 
                        id="pwd"  
                        onChange={(e) => setPwd(e.target.value)} 
                    />
                
        
                    <button disabled={ !validEmail || !validPwd ? true : false }>Sign In</button>

                
                </form>
            </section>

        
        </div>
    )
}

export default Register;