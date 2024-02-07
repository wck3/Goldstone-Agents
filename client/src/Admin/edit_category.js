import React from "react";
import axios from "axios";
import {useEffect, useState, useRef} from 'react';
import { useParams, useNavigate, redirect } from "react-router-dom";
import get_from from "../API/get_from";
import Loading from "../Components/loading";
import styles from "./edit_user.css";
import Admin_Auth from "../API/admin_auth";


export default function EditCategory(){
    const navigate = useNavigate();
    const {cID} = useParams();
    const [data, setData] = useState();
    const api_url = process.env.REACT_APP_API_URL;
    const errRef = useRef();
    const categoryRef = useRef();
    const [category, setCategory] = useState();
    const [errMsg, setErrMsg] = useState(false);

    const EDIT_URL = api_url + "tools/update-category";
    const DELETE_URL = api_url + "tools/delete-category";

    Admin_Auth();

    var params = {
        cID : cID
    }   
    useEffect(() => {
        async function fetchCategoryAndSetState() {
            try {
                // fetch all filtered users to display
                const result = await get_from(api_url + "tools/get-category", params);
            
                if(result !== "none"){
                    setData(result);
                    setCategory(result[0].category);
                }
                else{
                  setData([]);  
                }
            } catch (error) {
              console.log('Error fetching data:', error);
            }
        }
        fetchCategoryAndSetState();
    // eslint-disable-next-line
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted");

        try{
            const response =  await axios.post(EDIT_URL, 
                JSON.stringify({cID, category}),{
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

    const handleDelete = async (e) => {
        e.preventDefault();
       
        if(window.confirm("Are you sure you want to delete this Category? All remaining tools under this category will be deleted.")){
           
            try{
                const response =  await axios.post(DELETE_URL, 
                    JSON.stringify({cID}),{
                        headers : {'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );  
                if(response.data.length > 0){
                    const success=`SUCCESSFULLY DELETED CATEGORY ${category}`;
                    localStorage.setItem('successMsg', success);
                    navigate("/Admin/ViewCategories");
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
            <h1 className="pg-title">EDIT CATEGORY</h1>

            {data !== undefined ? (
            <>
             <form className="edit-user-form" onSubmit={handleSubmit}>
             <input 
                type="text"
                id="title" 
                autoComplete="off" 
                onChange={(e) => setCategory(e.target.value)} 
                value={category}
                ref={categoryRef}
              />
              
              <h3 ref={errRef} className={"errmsg" + errMsg ? styles.errmsg : "hide"}>{errMsg}</h3>
              <div className="btn-wrapper">
                <button onClick={redirect} value={"/Admin/ViewCategories"}>BACK</button>
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