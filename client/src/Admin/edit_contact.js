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
    
    const [imagePath, setImagePath] = useState();
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    
    const [fileErr, setFileErr] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
   
    const api_url = process.env.REACT_APP_API_URL;
    const EDIT_URL = api_url + "";
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
                setImagePath(result[0].contact_img);
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
        e.preventDefault();
        console.log(image);
        console.log(name);
        console.log(title);
        console.log(phone);
        console.log(email);
        /*
        try{
            const response =  await axios.post(EDIT_URL, 
                JSON.stringify({name, title, phone, email, image}),{
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
        */
        return;
    }
    const handleDelete = async (e) => {
        e.preventDefault();
       
        if(window.confirm("Are you sure you want to delete this Contact?")){
           
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
    
    const handleUpload = async (e) => { 
        
        if(e.target.files[0].size / 1024 > 200){
            setFileErr("File exceeds size limit of 200KB");
            return
        }
        setFileErr('');
        setImagePath(URL.createObjectURL(e.target.files[0])); 
        setImage(e.target.files[0])
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
        setFileErr('')
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
                        <img loading="lazy" src={imagePath} alt="headshot"></img>
                    </div>
                    
                    <ImageUpload className="img-upload" isOpen={isPopupOpen} onClose={closePopup}>
                        <h2>Upload an Image</h2>
                        <input type="file" accept=".jpg, .png, .jpeg" onChange={ handleUpload }/>
                        <h3 ref={errRef} className={"errmsg" + fileErr ? styles.fileErr : "hide"}>{fileErr}</h3>
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
                    <button onClick={redirect} value={"/ViewContacts"}>BACK</button>
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