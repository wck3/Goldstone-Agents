import React from "react";
import './edit_tool.css';
import './edit_contact.css';
import {useState, useEffect, useRef } from "react";
import get_from from "../API/get_from";
import Loading from "../Components/loading";
import axios from "axios";
import Admin_Auth from "../API/admin_auth";
import styles from "./edit_tool.css";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "../Components/image_upload";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function EditContact(){
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [categories, setCatagories] = useState();
    const {cID} = useParams();

    const errRef = useRef();
    const nameRef = useRef();
    
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    
    const [errMsg, setErrMsg] = useState(false);
   
    const api_url = process.env.REACT_APP_API_URL;
    const EDIT_URL = api_url + "tools/update-tool";
    const DELETE_URL = api_url + "tools/delete-tool";

    Admin_Auth();
    // retrieve external tool links from backend
    var params = {
        cID : cID
    }   
    useEffect(() => {
        async function fetchContactsAndSetState() {
            try {
                const result = await get_from(api_url + "Contacts/get-contact", params);
                setData(result[0]);
                setImage(result[0].contact_img);
                setName(result[0].name);
                setTitle(result[0].title);
                setPhone(result[0].phone);
                setEmail(result[0].email);
                const categories = await get_from(api_url + "tools/get-categories");
                setCatagories(categories);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchContactsAndSetState();
    }, []);


    const handleSubmit = async (e) => {
        /*e.preventDefault();

        var cID = e.target.category.value;
        try{
            const response =  await axios.post(EDIT_URL, 
                JSON.stringify({tool_id, title, , description, cID}),{
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
            nameRef.current.focus();
            errRef.current.focus();
        }
        
        return;*/
    }
    const handleDelete = async (e) => {
        e.preventDefault();
       
        if(window.confirm("Are you sure you want to delete this Tool?")){
           
            try{
                const response =  await axios.post(DELETE_URL, 
                    JSON.stringify({cID}),{
                        headers : {'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );  
                if(response.data.length > 0){
                    const success=`SUCCESSFULLY DELETED ${title}`;
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

    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = (e) => {
        e.preventDefault();
        setPopupOpen(true);
    };

    const closePopup = (e) => {
        e.preventDefault();
        setPopupOpen(false);
    };
    
    return(
        <div className="Edit-Contact">
            <ImageUpload/>
            <h1 className="pg-title">EDIT CONTACT</h1>

            {data !== undefined && categories !== undefined? (
            <>
                <form className="edit-user-form" onSubmit={handleSubmit}>
                 
                <a className="contact-img" onClick={openPopup}>
                    <div className="contact-link">
                        <h1 className="edit-banner"><FontAwesomeIcon icon={faEdit} className="ext"/></h1>
                        <img loading="lazy" src={image} alt="headshot"></img>
                    </div>
                    
                    <ImageUpload className="img-upload" isOpen={isPopupOpen} onClose={closePopup}>
                        <h2>Upload an Image</h2>
                        <input type="file" onChange={ (e) => setImage(URL.createObjectURL(e.target.files[0]))}/>
                    </ImageUpload>
            
                    
                </a>

                <input 
                    type="text"
                    name="name"
                    id="name" 
                    autoComplete="off" 
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                    ref={nameRef}
                />

                <input 
                    type="text"
                    name="title"
                    id="title" 
                    autoComplete="off" 
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title}
                />

                <input 
                    type="text"
                    name="phone"
                    id="phone" 
                    autoComplete="off" 
                    onChange={(e) => setPhone(e.target.value)} 
                    value={phone}
                />
                
                <input 
                    type="text"
                    name="email"
                    id="email" 
                    autoComplete="off" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                />
                
              
                
                <h3 ref={errRef} className={"errmsg" + errMsg ? styles.errmsg : "hide"}>{errMsg}</h3>
                <div className="btn-wrapper">
                    <button onClick={redirect} value={"/Admin/ViewContacts"}>BACK</button>
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