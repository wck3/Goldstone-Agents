import React from "react";
import axios from "axios";
import {useEffect, useState, useRef} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import get_from from "../API/get_from";
import Loading from "../Components/loading";
import styles from "./edit_user.css";
import Admin_Auth from "../API/admin_auth";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
    const [resetPwd, setResestPwd] = useState(false);
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(true);
    const [pwdFocus, setPwdFocus] = useState(false)
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(true);
    const [matchFocus, setMatchFocus] = useState(false);

    const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.+[a-zA-Z]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const EDIT_URL = api_url + "users/update-user";
    const DELETE_URL = api_url + "users/delete-user";

    Admin_Auth();

    var params = {
        uID : userID
    }   
    useEffect(() => {
        //async function fetchUserAndSetState() {
            //try {
                // fetch all filtered users to display
                //const result = await get_from(api_url + "users/get-user", params);
                 // Define your backend API URL
            if(userID){

            
                const apiUrl = `${api_url}users/get-user/${userID}`;
                console.log(apiUrl);

                // Fetch user data from the backend
                axios.get(apiUrl)
                .then(result => {
                    //setUserData(response.data);
                    setUser(result.data);
                    setEmail(result.data[0].email);
                    setFName(result.data[0].fName);
                    setLName(result.data[0].lName);
                    setRole(result.data[0].role_id);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
            }
            /*    if(result !== "none"){
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
            }*/
        //}
        //fetchUserAndSetState();
        
    // eslint-disable-next-line
    }, []);
console.log(user);
     // clear error message if form is changed
     useEffect(() => {
        setErrMsg('');
    }, [pwd, matchPwd]);

    // client-side password validation
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        if(result){
            setValidPwd(pwd);
        }
        else{
            setValidPwd(null);
        }
        const match = matchPwd === pwd;
        setValidMatch(match);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pwd, matchPwd]);
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted");

        // error if user tries to submit with improper new password
        if( (pwd !== '' && matchPwd !== '') && (!validPwd || !validMatch) ){  
            setTimeout(() => {
                setErrMsg('New Password Requirements not met');
            }, 0)
            return
        }

        // prevent js hacking
        const v1 = pwd === '' || PWD_REGEX.test(pwd);
        const v2 = pwd === '' || PWD_REGEX.test(matchPwd);
        if(!v1 || !v2 ){  
            setPwd('');
            setMatchPwd('');
            setTimeout(() => {
                setErrMsg("INVALID CREDENTIALS");
            }, 0)
            return;
        }


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
                JSON.stringify({userID, email, fName, lName, role, pwd}),{
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
                    navigate("/ViewUsers");
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
                
                <label className="checkbox-label" htmlFor="checkbox">Reset Password?</label>
                <input id="checkbox" type="checkbox" onChange={() => setResestPwd(resetPwd => !resetPwd)} name="checkbox"/>
                
                {resetPwd === true ? (
                <>
                <input 
                    type="password"
                    id="newPwd" 
                    autoComplete="off"
                    
                    onChange={(e) => setPwd(e.target.value)} 
                    value={pwd} 
                    placeholder="NEW PASSWORD" 
                    aria-invalid={validPwd ? "false" : "true" }
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(true)}
                />
                <p id="pwdnote" className={pwd && pwdFocus && !validPwd ? "instructions" : "hide"}>
                    <FontAwesomeIcon icon={faInfoCircle}/> 8 to 24 Characters. <br/>
                    Must include uppercase letters, lowercase letters, a number, and a special character. <br/>
                    Allowed special characters: !@#$%
                </p>
                <input 
                    type="password" 
                    id="matchPwd"  
                    autoComplete="off" 
                    onChange={(e) => setMatchPwd(e.target.value)} 
                    value={matchPwd}
                    placeholder='CONFIRM'
                    aria-invalid={validMatch ? "false" : "true" }
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(true)}
                />
                <p id="matchnote" className={matchPwd && matchFocus && !validMatch ? "instructions" : "hide"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>{' '}
                    Passwords do not match.
                </p>

                </>
                ) : null }

                <label className="checkbox-label" htmlFor="checkbox">Make this user an administrator?</label>
                <input id="checkbox" type="checkbox" checked={role === 1} value={role} onChange={() => setRole(role === 1 ? 2 : 1)} name="checkbox"/>

                <h3 ref={errRef} className={"errmsg" + errMsg ? styles.errmsg : "hide"}>{errMsg}</h3>
                <div className="btn-wrapper">
                <button onClick={redirect} value={"/ViewUsers"}>BACK</button>
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