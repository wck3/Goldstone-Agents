import React from "react";
import { useRef, useState, useEffect } from "react";
import get_session from "../API/get_session";
import axios from "axios";
import './Account.css';
import styles from "./Login.css";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Account(){
    const errRef = useRef();
    const [account, setAccount] = useState();
    const [uID, setUID] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(true);
    const [pwdFocus, setPwdFocus] = useState(false)
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(true);
    const [matchFocus, setMatchFocus] = useState(false);
    const [currentPwd, setCurrentPwd] = useState('');
    const [errMsg, setErrMsg] = useState(false);
    const EDIT_URL = 'http://localhost:4000/users/update-account';
    const PWD_REGEX = /^(?=.*[a-z])(.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    
    useEffect( () => {
        async function fetchAccount(){
            try {
                // fetch all tools to display

                // ** NOTE: may need to create get_user function in future depending on update account setup **
                const result = await get_session();
                if(result.loggedIn !== false){
                    console.log(result)
                    setAccount(result);
                    setFirstName(result.user.fName);
                    setLastName(result.user.lName);
                    setUID(result.user.user_id);
                }
                
               
                //console.log(account)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchAccount();
        
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [firstname, lastName, pwd, matchPwd, currentPwd]);

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
    }, [pwd, matchPwd]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if( (pwd !== '' && matchPwd != '') && !validPwd || !validMatch ){  
            setTimeout(() => {
                setErrMsg('New Password Requirements not met');
            }, 0)
            return
        }

        // prevent js hacking
        const v1 = pwd === '' || PWD_REGEX.test(pwd);
        const v2 = pwd === '' || PWD_REGEX.test(matchPwd);
        const v3 = PWD_REGEX.test(currentPwd);
        if(!v1 || !v2 || !v3 ){  
            setCurrentPwd('');
            setPwd('');
            setMatchPwd('');
            setTimeout(() => {
                setErrMsg("INVALID CREDENTIALS");
            }, 0)
            return;
        }
        
        try{
            console.log(uID);
            const response =  await axios.post(EDIT_URL, 
                JSON.stringify({uID, firstname, lastName, pwd, currentPwd}),{
                    headers : {'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            // user validated, send success
            if(response){
                //navigate("/");
                console.log('success');
            }
        } catch (err){ 
            //setEmail('');
            //setPwd('');
            setCurrentPwd('');
            setPwd('');
            setMatchPwd('');
            if(!err.response){
                setTimeout(() => {
                    setErrMsg('No Server Response');
                }, 0)
            }
            else if(err.response?.status === 409){
                if(err.response?.data === false){
                    setCurrentPwd('');
                    setPwd('');
                    setMatchPwd('');
                    setTimeout(() => {
                        setErrMsg('PASSWORDS ARE THE SAME');
                    }, 0)
                }
                else{
                   setCurrentPwd('');
                   setPwd('');
                   setMatchPwd('');
                   setTimeout(() => {
                        setErrMsg('INVALID CREDENTIALS');
                    }, 0) 
                }
                
            }
            else{
                setTimeout(() => {
                    setErrMsg('UPDATE FAILED');
                }, 0)
            }  
            //emailRef.current.focus();
            //errRef.current.focus();
        }
        
        return;
    }
    console.log(account);

    return(


        <div className="Account">
            <h1 className="pg-title">ACCOUNT</h1>
            {account !== undefined ? (
                <>  
                <h2>{account.user.fName} {account.user.lName}</h2>
                <h2>{account.user.email}</h2>
                <div className="edit-account"> 
                  
                    <div className="edit-name">
                        <h1>EDIT NAME</h1>
                        <form onSubmit={handleSubmit}>    
                            <input 
                              
                                type="text"
                                id="firstName" 
                                autoComplete="off" 
                                onChange={(e) => setFirstName(e.target.value)} 
                                value={firstname}
                                placeholder={firstname}
                            />
                            <input 
                                
                                type="text" 
                                id="lastName"
                                autoComplete="off"   
                                onChange={(e) => setLastName(e.target.value)} 
                                value={lastName}
                                placeholder={lastName}
                            />
                           
                        </form>
                    </div>

                    
                    <div className="edit-pwd">
                        <h1>EDIT PASSWORD</h1>
                        <form onSubmit={handleSubmit}>    
                            
                            <input 
                                type="password"
                                id="newPwd" 
                                autoComplete="off"
                               
                                onChange={(e) => setPwd(e.target.value)} 
                                value={pwd} 
                                placeholder="PASSWORD" 
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
                           
                        </form>
                        
                    </div>
                </div>
                <div className="submit">
                    <form onSubmit={handleSubmit}>    
                        <input
                            required
                            type="password"
                            id="currPwd" 
                            onChange={(e) => setCurrentPwd(e.target.value)} 
                            value={currentPwd}
                            autoComplete="off"    
                            placeholder="CURRENT PASSWORD"
                        />
                           <button>CONFIRM</button>
                    </form>

                    <h3 ref={errRef} className={"errmsg" + errMsg ? styles.errmsg : "hide"}>{errMsg}</h3>
                                         
                    </div>
                </>
            ):(
                <h1>LOADING...</h1>
            )}
        
        </div>

    );

};