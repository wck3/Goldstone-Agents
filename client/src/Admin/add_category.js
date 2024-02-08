import React from "react";
import axios from "axios";
import {useEffect, useState, useRef} from 'react';
import { useParams, useNavigate, redirect } from "react-router-dom";
import styles from "./edit_user.css";
import Admin_Auth from "../API/admin_auth";


export default function AddCategory(){
    const navigate = useNavigate();
    const api_url = process.env.REACT_APP_API_URL;
    const errRef = useRef();
    const categoryRef = useRef();
    const [category, setCategory] = useState();
    const [errMsg, setErrMsg] = useState(false);

    const ADD_URL = api_url + "tools/add-category";

    Admin_Auth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitting");
        console.log(category)
        try{
            const response =  await axios.post(ADD_URL, 
                JSON.stringify({category}),{
                    headers : {'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );  
            if(response.data.length > 0){
                setErrMsg("UPDATE SUCCESSFUL");
            }
        } catch (err){ 
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
            categoryRef.current.focus();
            errRef.current.focus();
        }
        
        return;
    }

    const redirect = async (e) => {
        e.preventDefault();
        navigate(e.target.value);
    }

    return(
        <div className="Edit-User">
            <h1 className="pg-title">ADD CATEGORY</h1>
            <form className="edit-user-form" onSubmit={handleSubmit}>
             <input 
                type="text"
                id="title" 
                autoComplete="off" 
                onChange={(e) => setCategory(e.target.value)} 
                value={category}
                ref={categoryRef}
                placeholder="CATEGORY NAMES"
              />
              
              <h3 ref={errRef} className={"errmsg" + errMsg ? styles.errmsg : "hide"}>{errMsg}</h3>
              <div className="btn-wrapper">
                <button onClick={redirect} value={"/ViewCategories"}>BACK</button>
                <button>SAVE</button>
              </div>
              
            </form>
           
        </div>
    )

}