import React from "react";
import axios from "axios";
import {useState, useEffect,useRef} from 'react';
import {useNavigate, } from "react-router-dom";
import Admin_Auth from "../API/admin_auth";
import styles from "./add_user.css";
import "./add_user.css";
import get_from from "../API/get_from";


export default function AddTool(){
  
    
    
    const api_url = process.env.REACT_APP_API_URL;

    const ADD_URL = api_url + "tools/add-tool";
   

    const navigate = useNavigate();
    const [categories, setCatagories] = useState();
    const errRef = useRef();
    const titleRef = useRef();
    const [title, setTitle] = useState();
    const [url, setURL] = useState();
    const [description, setDescription] = useState();
    const [catID, setCatID] = useState();
    
    const [errMsg, setErrMsg] = useState(false);
    Admin_Auth();

    useEffect(() => {
        async function fetchToolsAndSetState() {
            try {
                const categories = await get_from(api_url + "tools/get-categories");
                setCatagories(categories);
                setCatID(categories[0].c_id);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchToolsAndSetState();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response =  await axios.post(ADD_URL, 
                JSON.stringify({title, url, description, catID}),{
                    headers : {'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );  
            if(response.data.length > 0){
                const success=`SUCCESSFULLY ADDED ${title}`;
                localStorage.setItem('successMsg', success);
                navigate("/Admin/ViewTools");
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
            titleRef.current.focus();
            errRef.current.focus();
        }
        console.log(catID);
        
        return;
    }

    const redirect = async (e) => {
        e.preventDefault();
        navigate(e.target.value);
    }
 

    return(
        <div className="Edit-Tool">
            <h1 className="pg-title">ADD TOOL</h1>
            <form className="edit-user-form" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                id="title" 
                autoComplete="off" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                ref={titleRef}
                placeholder="Tool Name"
            />

            <input 
                type="text"
                name="url"
                id="url" 
                autoComplete="off" 
                onChange={(e) => setURL(e.target.value)} 
                value={url}
                placeholder="URL"
            />
            
            <textarea
                type="textarea"
                name="description"
                id="description" 
                autoComplete="off" 
                onChange={(e) => setDescription(e.target.value)} 
                value={description}
                placeholder="Brief Description"
            />
            
            <div className="btn-wrapper">
                <label htmlFor="category">CATEGORY:</label>
                <select name="category" onChange={ (e) => (setCatID(e.target.value))}>
                    {categories?.map( (item) => (
                   
                    <option key={item.c_id} value={item.c_id}>{item.category}</option>
                 
                    ))}
                </select>
            </div>
            
            
            <h3 ref={errRef} className={"errmsg" + errMsg ? styles.errmsg : "hide"}>{errMsg}</h3>
            <div className="btn-wrapper">
                <button onClick={redirect} value={"/Admin/ViewTools"}>BACK</button>
                <button>ADD</button>
            </div>
            
            </form>
          
        </div>
    )
    
}