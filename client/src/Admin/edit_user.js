import React from "react";
import axios from "axios";
import {useEffect, useState, useRef} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import get_from from "../API/get_from";
import Loading from "../Components/loading";
import styles from "./edit_user.css";
import Admin_Auth from "../API/admin_auth";


export default function EditUser(){
    const navigate = useNavigate();
    const {userID} = useParams();
    const [user, setUser] = useState();
    const api_url = process.env.REACT_APP_API_URL;
    const errRef = useRef();
    const emailRef = useRef();
    const [email, setEmail] = useState();
    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [role, setRole] = useState(2);
    const [errMsg, setErrMsg] = useState(false);

    const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.+[a-zA-Z]{3,23}$/;
    const EDIT_URL = api_url + "users/update-user";
    const DELETE_URL = api_url + "users/delete-user";

    Admin_Auth();

    var params = {
        uID : userID
    }   
    useEffect(() => {
        async function fetchUserAndSetState() {
            try {
                // fetch all filtered users to display
                const result = await get_from(api_url + "users/get-user", params);
            
                if(result !== "none"){
                    setUser(result);
                    setEmail(result[0].email);
                    setFName(result[0].fName);
                    setLName(result[0].lName);
                    setRole(result[0].role_id);
                }
                else{
                  setUser([]);  
                }
            } catch (error) {
              console.log('Error fetching data:', error);
            }
        }
        fetchUserAndSetState();
    // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted");

        const validate = EMAIL_REGEX.test(email);
        if(!validate){  
            setEmail('');
            setFName('');
            setLName('');
            setTimeout(() => {
                setErrMsg("INVALID CREDENTIALS");
            }, 0)
            emailRef.current.focus();
            return;
        }
        try{
            const response =  await axios.post(EDIT_URL, 
                JSON.stringify({userID, email, fName, lName, role}),{
                    headers : {'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );  
            if(response.data.length > 0){
                setErrMsg("UPDATE SUCCESSFUL");
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

    const handleDelete = async (e) => {
        e.preventDefault();
       
        if(window.confirm("Are you sure you want to delete this user?")){
           
            try{
                const response =  await axios.post(DELETE_URL, 
                    JSON.stringify({userID}),{
                        headers : {'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );  
                if(response.data.length > 0){
                    const success=`SUCCESSFULLY DELETED ${fName} ${lName}`;
                    localStorage.setItem('successMsg', success);
                    navigate("/Admin/ViewUsers");
            }
            } catch (err){ 
                if(!err.response){
                    setTimeout(() => {
                        setErrMsg('No Server Response');
                    }, 0)
                }
                else{
                    setTimeout(() => {
                        setErrMsg('DELETION FAILED');
                    }, 0)
                }  
            }
        
        return;

        }

    }

    const redirect = async (e) => {
        e.preventDefault();
        navigate(e.target.value);
    }

    return(
        <div className="Edit-User">
            <h1 className="pg-title">EDIT USER</h1>

            {user !== undefined ? (
            <>
             <form className="edit-user-form" onSubmit={handleSubmit}>
                <input 
                    type="email"
                    id="email" 
                    autoComplete="off" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                    ref={emailRef}
                />
                <input 
                    type="text"
                    id="fName" 
                    autoComplete="off" 
                    onChange={(e) => setFName(e.target.value)} 
                    value={fName}
                    placeholder={fName}
                />

                <input 
                    type="text"
                    id="fName" 
                    autoComplete="off" 
                    onChange={(e) => setLName(e.target.value)} 
                    value={lName}
                    placeholder={lName}
                />

                <label className="checkbox-label" htmlFor="checkbox">Make this user an administrator?</label>
                <input id="checkbox" type="checkbox" checked={role === 1} value={role} onChange={() => setRole(role === 1 ? 2 : 1)} name="checkbox"/>

                <h3 ref={errRef} className={"errmsg" + errMsg ? styles.errmsg : "hide"}>{errMsg}</h3>
                <div className="btn-wrapper">
                <button onClick={redirect} value={"/Admin/ViewUsers"}>BACK</button>
                <button>SAVE</button>
                <button className="delete-btn"onClick={handleDelete}>DELETE</button>
                </div>
              
            </form>
            </>
            ):
            (<Loading/>)
            }       
        </div>
    )

}