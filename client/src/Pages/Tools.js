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
                <div key={tool.category} className="tool-category">
                    <h2>{tool.category}</h2>
                    <ul>
                        {tool.info?.map((data) => (
                        <li key={data.id}>
                            <strong>{data.title}</strong>
                            <p>{data.description}</p>
                        </li>
                        ))}
                    </ul>
                </div>
            ))}
              
            
           
        </div>
    );
};

