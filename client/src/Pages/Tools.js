import React from "react";
import './Tools.css';
import axios from 'axios';
import {useState, useEffect } from "react";
//import { get } from "../../../server/routes/user";
//import { get } from "../../../server/routes/user";
async function get_tools(){
    axios.defaults.withCredentials = true;
    try{
        const response = await axios.get("http://localhost:4000/tools/get-tools");
        if(response){
            //console.log(response)
            return response.data
        }
    } catch(err){
        console.log(err);
    }
}; 
export default function Tools(){
    const [data, setData] = useState();
 
    // Correct
    useEffect(() => {
        async function fetchDataAndSetState() {
            try {
              const result = await get_tools();
              setData(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
      
          fetchDataAndSetState();
        }, []);
       
    //console.log(data);
    //console.log(typeof(data));

   /*data?.map((item) => {
        console.log(item.category, item.c_id);
        item.info.map((tool) => {
             console.log(tool)
        })

    });*/
    
    return(
       
        <div className="Tools">
            <h1>EXTERNAL TOOLS</h1>
           
            {data?.map((tool) => (
                <>
                <div className="wave-container">
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
                    <ul>
                        {tool.info?.map((data) => (
                        <li key={data.id}>
                            <h2>{data.title}</h2>
                            <p>{data.description}</p>
                        </li>
                        ))}
                    </ul>
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

