import React from "react";
import {useRef, useState} from 'react';

// pagination page selector
const Pagination_Pages = ({postsPerPage, totalPosts, paginate}) => {
    const clickRef = useRef();
    const [activePage, setActivePage] = useState(1);

    const pageNumbers = [];
    const totalPages = Math.ceil(totalPosts/postsPerPage);
    // get total page numbers needed
    if(totalPages > 1){
        for( let i=1; i <= Math.ceil(totalPosts/postsPerPage); i++){
            pageNumbers.push(i)
        }
    }

    // set active page, switch to desired page
    const handleClick = (number) => {
        setActivePage(number);
        paginate(number);
    };
   
    return(
        <div className="pages">
            {pageNumbers?.map(number =>(
                <a onClick={() => handleClick(number)} key={number}  ref={clickRef} className={ number == activePage ? "page-selector clicked" : "page-selector"}>
                    <span className="dot"></span>
                </a>    
            ))}
        </div>
    );
};

export default Pagination_Pages;