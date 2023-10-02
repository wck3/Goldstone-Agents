import React from "react";
import './Tools.css';
import axios from 'axios';
import {useState, useEffect } from "react";
import Pagination_Pages from "../Components/pagination_pgs";

async function get_tools(){
    axios.defaults.withCredentials = true;
    try{
        const response = await axios.get("http://localhost:4000/tools/get-tools");
        if(response){
            return response.data
        }
    } catch(err){
        console.log(err);
    }
}; 

export default function Tools(){
    const [data, setData] = useState();
    const [postsPerPage] = useState(3);
    const [paginationInfo, setPaginationInfo] = useState({});

    useEffect(() => {
        async function fetchToolsAndSetState() {
            try {
                // fetch all tools to display
                const result = await get_tools();
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
       
    return(
       
        <div className="Tools">
            <h1 className="pg-title">EXTERNAL TOOLS</h1>
            {data?.map((tool) => (
                <>
                <div className="wave-container wave-top">
                    <div className="box-wave box-wave-2">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 1200 120" preserveAspectRatio="none">
                            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-2"></path>
                        </svg>   
                    </div>
                    <div className="box-wave ">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 1200 120" preserveAspectRatio="none">
                            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-1"></path>
                        </svg>   
                    </div>
                </div>
                
                <div key={tool.category} className="tool-category">
                    <h1>{tool.category}</h1>
                    <div className="tool-info">
                        <ul>
                            {/* display paginated by using individual currently active page and desired postsPerPage*/}
                            {tool.info.slice(paginationInfo[tool.category].currentPage * postsPerPage - postsPerPage, paginationInfo[tool.category].currentPage * postsPerPage).map((data) => (
                                <li key={data.id}>
                                    <h2><a href={data.link} target="_blank" rel="noreferrer noopener">{data.title}</a></h2>
                                    <p>{data.description}</p>
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

                <div className="wave-container wave-bottom">
                    <div className="box-wave box-wave-2">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-2"></path>
                    </svg>   
                    </div>
                    <div className="box-wave ">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 1200 120" preserveAspectRatio="none">
                            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-1"></path>
                        </svg>   
                    </div>
                </div>
                </>
            ))}
        </div>
    );
};

