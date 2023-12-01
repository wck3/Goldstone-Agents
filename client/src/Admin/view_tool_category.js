import React from "react";
import "./view_users.css";
import get_from from "../API/get_from";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../Components/loading";
import PaginationPages from "../Components/pagination_pgs";
import styles from "./view_users.css";
import Admin_Auth from "../API/admin_auth";

export default function ViewUsers(){
    const navigate = useNavigate();
    const [data, setData] = useState();
    const api_url = process.env.REACT_APP_API_URL;
    
    Admin_Auth();
    
    // fetch events from back end
    useEffect(() => {
    async function fetchUsersAndSetState() {
        try {
            // fetch all tools to display
            const result = await get_from(api_url + "tools/get-categories");
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    fetchUsersAndSetState();
    console.log(data);
    // eslint-disable-next-line
    }, []);

    const handleNew = async (e) => {
        e.preventDefault();
        navigate("/Admin/AddCategory")
    }
    const [successMsg, setSuccess] = useState(false);

     // retrieve success message if it exists in local storage
     useEffect( () => {
        const storedMessage = localStorage.getItem('successMsg');
        if(storedMessage){
            setSuccess(storedMessage);
            const timer = setTimeout(() => {
                setSuccess(false);
                localStorage.removeItem('successMsg');
            }, 4000);
              
              // Clear the timer when the component unmounts
              return () => clearTimeout(timer);
        }
    }, [])

    const handleEdit = (e) => {
        e.preventDefault();
        const cID = e.target.value;
        navigate(`/Admin/EditCategory/${cID}`)
    }

    return(
        <div className="View-Users">
            <h1 className="pg-title">TOOL CATEGORIES</h1>

            <h3 className={"successMsg" + successMsg ? styles.successMsg : "hide"}>{successMsg}</h3>
            
            {data !== undefined ? (
            <>
         
                <table className="userList">
                    
                    <thead>
                        <tr>
                            <th>Category</th>
                        </tr>
                    </thead>
                    
                    {data?.map( (item) => (
                   
                    <tbody className="user-info" key={item.c_id}>
                        <tr>
                            <td>{item.category}</td>
                            <td className="user-options"> 
                                <button onClick={handleEdit} value={item.c_id}>EDIT</button>
                            </td>
                           
                        </tr>
                    </tbody>
                ))}
                </table>

                <button className="tool-edit-btn" onClick={handleNew}> ADD NEW </button>
            </>
            ) : (
                <Loading />
            )}
        </div>
    );
};