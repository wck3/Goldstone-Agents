import React from "react";
import './edit_tool.css';
import {useState, useEffect } from "react";
import Pagination_Pages from "../Components/pagination_pgs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import get_from from "../API/get_from";
import Loading from "../Components/loading";
import Admin_Auth from "../API/admin_auth";
import { useNavigate } from "react-router-dom";
import styles from "./view_users.css";


export default function ViewTools(){
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [postsPerPage] = useState(3);
    const [paginationInfo, setPaginationInfo] = useState({});
    const api_url = process.env.REACT_APP_API_URL;
    
    Admin_Auth();
    // retrieve external tool links from backend
    useEffect(() => {
        async function fetchToolsAndSetState() {
            try {
                const result = await get_from(api_url + "tools/get-tools");

                setData(result);
                const paginationData = {};
                // set current page for each category of tool individually
                // allows for seperate pagination of each category
                result.forEach((tool) => {
                    paginationData[tool.category] = {
                        currentPage: 1,
                    };
                });
                setPaginationInfo(paginationData);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchToolsAndSetState();
    }, []);

    const handleEdit = (e) => {
        e.preventDefault();
        const tool_ID = e.target.value;
        navigate(`/EditTool/${tool_ID}`)
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

    const redirect = async (e) => {
        e.preventDefault();
        navigate(e.target.value);
    }

    return(
       
        <div className="Tools">
            <h1 className="pg-title">EDIT TOOLS</h1>
            <div className="btn-wrapper">
                <button className="tool-edit-btn" value="/AddTool" onClick={redirect}>NEW TOOL</button>
                <button className="tool-edit-btn" value="/ViewCategories" onClick={redirect}>EDIT CATEGORIES</button>
            </div>
            <h3 className={"successMsg" + successMsg ? styles.successMsg : "hide"}>{successMsg}</h3>
            {data !== undefined ? (
                data?.map((tool) => (
                
                <div key={tool.category} className="tool-category">
                    <h1>{tool.category}</h1>
                    <div className="tool-info">
                        <ul>
                            {/* display paginated by using individual currently active page and desired postsPerPage*/}
                            {tool.info.slice(paginationInfo[tool.category].currentPage * postsPerPage - postsPerPage, paginationInfo[tool.category].currentPage * postsPerPage).map((data) => (
                                <li key={data.id}>
                                    <h2>
                                        <a href={data.link} target="_blank" rel="noreferrer noopener">
                                            {data.title} <FontAwesomeIcon icon={faExternalLink} className="ext"/>
                                        </a>
                                    </h2>
                                    <p>{data.description}</p>
                                    <button className="tool-edit-btn" value={data.id} onClick={handleEdit}>EDIT</button>
                                </li>
                            ))}
                         </ul>    
                        {/* update current page using setPaginationInfo state */}
                        <Pagination_Pages postsPerPage={postsPerPage} totalPosts={tool.info.length} 
                            paginate={(pageNumber) => {
                                const updatedPaginationInfo = { ...paginationInfo };
                                updatedPaginationInfo[tool.category].currentPage = pageNumber;
                                setPaginationInfo(updatedPaginationInfo);
                            }}
                        />
                    </div> 
                </div>
            )) ):(
                <Loading/>
            )}
            </div>
    
    );
};

