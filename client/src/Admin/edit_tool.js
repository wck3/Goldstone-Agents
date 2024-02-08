import React from "react";
import './edit_tool.css';
import {useState, useEffect, useRef } from "react";
import get_from from "../API/get_from";
import Loading from "../Components/loading";
import axios from "axios";
import Admin_Auth from "../API/admin_auth";
import styles from "./edit_tool.css";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewCategory(){
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [categories, setCatagories] = useState();
    const {tool_id} = useParams();

    const errRef = useRef();
    const titleRef = useRef();
    const [title, setTitle] = useState();
    const [url, setURL] = useState();
    const [description, setDescription] = useState();
    
    const [errMsg, setErrMsg] = useState(false);
   
    const api_url = process.env.REACT_APP_API_URL;
    const EDIT_URL = api_url + "tools/update-tool";
    const DELETE_URL = api_url + "tools/delete-tool";

    Admin_Auth();
    // retrieve external tool links from backend
    var params = {
        tID : tool_id
    }   
    useEffect(() => {
        async function fetchToolsAndSetState() {
            try {
                const result = await get_from(api_url + "tools/get-tool", params);
                setData(result[0]);
                setTitle(result[0].title);
                setURL(result[0].hyperlink);
                setDescription(result[0].description);
                const categories = await get_from(api_url + "tools/get-categories");
                setCatagories(categories);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchToolsAndSetState();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        var cID = e.target.category.value;
        try{
            const response =  await axios.post(EDIT_URL, 
                JSON.stringify({tool_id, title, url, description, cID}),{
                    headers : {'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );  
            if(response.data.length > 0){
                setErrMsg("UPDATE SUCCESSFUL");
                setTimeout(() => {
                    setErrMsg("");
                }, 2000)
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
        
        return;
    }
    const handleDelete = async (e) => {
        e.preventDefault();
       
        if(window.confirm("Are you sure you want to delete this Tool?")){
           
            try{
                const response =  await axios.post(DELETE_URL, 
                    JSON.stringify({tool_id}),{
                        headers : {'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );  
                if(response.data.length > 0){
                    const success=`SUCCESSFULLY DELETED ${title}`;
                    localStorage.setItem('successMsg', success);
                    navigate("/ViewTools");
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
        <div className="Edit-Tool">
            <h1 className="pg-title">EDIT TOOL</h1>

            {data !== undefined && categories !== undefined? (
            <>
                <form className="edit-user-form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    id="title" 
                    autoComplete="off" 
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title}
                    ref={titleRef}
                />

                <input 
                    type="text"
                    name="url"
                    id="url" 
                    autoComplete="off" 
                    onChange={(e) => setURL(e.target.value)} 
                    value={url}
                />
                
                <textarea
                    type="textarea"
                    name="description"
                    id="description" 
                    autoComplete="off" 
                    onChange={(e) => setDescription(e.target.value)} 
                    value={description}
                    placeholder={description}
                />
                
                <div className="btn-wrapper">
                    <label htmlFor="category">CATEGORY:</label>
                    <select name="category">
                        <option value={data.cat_id}>{data.category}</option>
                        {categories?.map( (item) => (
                        item.c_id !== data.cat_id && (
                            <option key={item.c_id} value={item.c_id}>{item.category}</option>
                        )
                        ))}
                    </select>
                </div>
                
                
                <h3 ref={errRef} className={"errmsg" + errMsg ? styles.errmsg : "hide"}>{errMsg}</h3>
                <div className="btn-wrapper">
                    <button onClick={redirect} value={"/ViewTools"}>BACK</button>
                    <button>SAVE</button>
                    <button className="delete-btn" onClick={handleDelete}>DELETE</button>
                </div>
                
                </form>
            </>
            ):
            (<Loading/>)
            }       
        </div>
    )
    
}