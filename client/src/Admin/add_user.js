import React from "react";
import axios from "axios";
import {useState, useRef} from 'react';
import {useNavigate } from "react-router-dom";
import Admin_Auth from "../API/admin_auth";
import styles from "./add_user.css";
import "./add_user.css";


export default function AddUser(){
    const navigate = useNavigate();
    const api_url = process.env.REACT_APP_API_URL;
    const errRef = useRef();
    const emailRef = useRef();
    const [email, setEmail] = useState();
    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [errMsg, setErrMsg] = useState(false);

    const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.+[a-zA-Z]{3,23}$/;
    const ADD_URL = api_url + "users/add-user";
   
    Admin_Auth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted");

        const validate = EMAIL_REGEX.test(email);
        if(!validate){  
            setEmail('');
            setFName('');
            setLName('');
            setTimeout(() => {
                setErrMsg("INVALID INPUTS");
            }, 0)
            emailRef.current.focus();
            return;
        }
        try{
            const response =  await axios.post(ADD_URL, 
                JSON.stringify({email, fName, lName}),{
                    headers : {'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );  
            if(response.data.length > 0){
                const success=`SUCCESSFULLY ADDED ${fName} ${lName}`;
                localStorage.setItem('successMsg', success);
                navigate("/Admin/ViewUsers");
            }
        } catch (err){ 
            setEmail('');
            setFName('');
            setLName('');
            if(!err.response){
                setTimeout(() => {
                    setErrMsg('No Server Response');
                }, 0)
            }
            else{
                setTimeout(() => {
                    setErrMsg('UPDATE FAILED');
                }, 0)
            }  
            emailRef.current.focus();
            errRef.current.focus();
        }
        
        return;
    }

    return(
        <div className="Add-User">
            <h1 className="pg-title">ADD USER</h1> 
            <form className="add-user-form" onSubmit={handleSubmit}>
             <input 
                type="email"
                id="email" 
                autoComplete="off" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                ref={emailRef}
                placeholder="EMAIL"
              />
              <input 
                type="text"
                id="fName" 
                autoComplete="off" 
                onChange={(e) => setFName(e.target.value)} 
                value={fName}
                placeholder="FIRST NAME"
              />

            <input 
                type="text"
                id="fName" 
                autoComplete="off" 
                onChange={(e) => setLName(e.target.value)} 
                value={lName}
                placeholder="LASTNAME"
              />

              <p>NOTE: A default password "Welcome123!" is created for all new users</p>
              <h3 ref={errRef} className={"errmsg" + errMsg ? styles.errmsg : "hide"}>{errMsg}</h3>
              <button>CREATE</button>

             </form>
        
               
        </div>
    )

}