import React from "react";
import {useRef, useState} from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './pagination_pgs.css';

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
    
    // shift page left if left arrow clicked 
    const leftArrow = () => {
        if(activePage !== 1){
            setActivePage(activePage-1)
            paginate(activePage-1);
        }
        else{
            setActivePage(totalPages)
            paginate(totalPages)
        }
        
    };
    
    // shift page right if right arrow clicked 
    const rightArrow = () => {
        if(activePage !== totalPages){
            setActivePage(activePage+1)
            paginate(activePage+1);
        }
        else{
            setActivePage(1)
            paginate(1)
        }
    };

    // bug fix: stops highlighting text when clicking arrow buttons quickly
    const handleMouseDown = (e) =>{
        if(e.detail > 1){
            e.preventDefault();
        }
    }


    // condition to show the pagination if there's more than one page
    const moreThanOne = totalPages > 1;
    // condition to show dot selectors if more than two pages
    const morePages = totalPages > 2;
    return(
        <>
        {moreThanOne ? 
        <div className="pages">
             
            <a onClick={() => leftArrow()}  onMouseDown={(e) => handleMouseDown(e)} ref={clickRef}>
                <FontAwesomeIcon icon={faArrowLeft} className='arrow'/>
            </a>
            {morePages ? pageNumbers?.map(number =>(
                <a onClick={() => handleClick(number)} key={number}  ref={clickRef} className={ number == activePage ? "page-selector clicked" : "page-selector"}>
                    <span className="dot"></span>
                </a>
            )): ''}
            <a onClick={() => rightArrow()}  onMouseDown={(e) => handleMouseDown(e)} ref={clickRef}>
                <FontAwesomeIcon icon={faArrowRight} className='arrow'/>
            </a>
        </div>
        : ' '}
        </>
    );
};

export default Pagination_Pages;