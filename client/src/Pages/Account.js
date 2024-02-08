import React from "react";
import { useRef, useState, useEffect } from "react";
import get_from from "../API/get_from";
import axios from "axios";
import './Account.css';
import styles from "./Account.css";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from "../Components/loading";

export default function Account(){
    const api_url = process.env.REACT_APP_API_URL;
    // state to store session information
    const [account, setAccount] = useState();
    // form states
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

    // message states
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState(false);
    const [AccountSuccessMsg, setAccountSuccess] = useState(false);

    const EDIT_URL = api_url  + 'users/update-account';
    const PWD_REGEX = /^(?=.*[a-z])(.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    
    // retrieve success message if it exists in local storage
    useEffect( () => {
        const storedMessage = localStorage.getItem('AccountSuccessMsg');
        if(storedMessage){
            setAccountSuccess(storedMessage);
            const timer = setTimeout(() => {
                setAccountSuccess(false);
                localStorage.removeItem('AccountSuccessMsg');
            }, 4000);
              
              // Clear the timer when the component unmounts
              return () => clearTimeout(timer);
        }
    }, [])
    
    // fetch account information from session variables
    useEffect( () => {
        async function fetchAccount(){
            try {
                // fetch all user information from session to display
                const result = await get_from(api_url + "users/login");
                if(result?.loggedIn === true){
                    setAccount(result);
                    setFirstName(result.user.fName);
                    setLastName(result.user.lName);
                    setUID(result.user.user_id);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // clear error message if form is changed
    useEffect(() => {
        setErrMsg('');
    }, [firstname, lastName, pwd, matchPwd, currentPwd]);

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
    
    
    // submission validation/post to api/error handling
    const handleSubmit = async (e) => {
        e.preventDefault();
        
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
            // send data to api after validation
            axios.defaults.withCredentials = true;
            const response =  await axios.post(EDIT_URL, 
                JSON.stringify({uID, firstname, lastName, pwd, currentPwd}),{
                    headers : {'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            // user validated, send success message and reload
            if(response){
                const success='SUCCESSFULLY UPDATED ACCOUNT';
                localStorage.setItem('AccountSuccessMsg', success);
                window.location.reload(); 
            }
        } catch (err){ // error handling  
            
            // clear form if there is an error
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
                    setTimeout(() => {
                        setErrMsg('PASSWORDS ARE THE SAME');
                    }, 0)
                }
                else{
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
        }
        return;
    }
    
    return(
        <div className="Account">
            <h1 className="pg-title">EDIT ACCOUNT</h1>
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
                            placeholder={account.user.firstname}
                        />
                        <input 
                            type="text" 
                            id="lastName"
                            autoComplete="off"   
                            onChange={(e) => setLastName(e.target.value)} 
                            value={lastName}
                            placeholder={account.user.lastName}
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
                    </form>
                </div>
            </div>
            <div className="submit">
                <h3 ref={errRef} className={"errmsg" + errMsg ? styles.errmsg : "hide"}>{errMsg}</h3>
                <h3 className={"successMsg" + AccountSuccessMsg ? styles.AccountSuccessMsg : "hide"}>{AccountSuccessMsg}</h3>
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
               
            </div>
            </>
            ):(
                <Loading/>
            )}
        
        </div>
    );
};
