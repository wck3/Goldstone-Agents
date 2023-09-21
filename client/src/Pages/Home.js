import React from "react";
import './Home.css';
import PaginatedData from "../Components/tools-paginated";

export default function Home(){
    return(
        
        <div className="Home">
            <h1>HOME</h1>
            <PaginatedData/>
        </div>
        
    );
};