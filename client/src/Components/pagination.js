import React from "react";
import {useRef, useState} from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const clickRef = useRef();
    const [activePage, setActivePage] = useState(1);

    const pageNumbers = [];
    const totalPages = Math.ceil(totalPosts/postsPerPage);
    
    if(totalPages > 1){
        for( let i=1; i <= Math.ceil(totalPosts/postsPerPage); i++){
            pageNumbers.push(i)
        }
    }

    const handleClick = (number) => {
        setActivePage(number);
        paginate(number);
    };
   
    return(
        <div className="pages">
            {pageNumbers?.map(number =>(
                <a onClick={() => handleClick(number)} key={number}  ref={clickRef} className={ number == activePage ? "page-selector clicked" : "page-selector"}>
                    <span class="dot"></span>
                </a>    
            ))}
        </div>
    );
};

export default Pagination;