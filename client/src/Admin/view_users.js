import React from "react";
import "./view_users.css";
import axios from "axios";
import get_from from "../API/get_from";
import { useState, useEffect } from "react";
import Loading from "../Components/loading";
import Pagination_Pages from "../Components/pagination_pgs";

export default function ViewUsers(){

    const [usersPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [userList, setUserList] = useState();
    const api_url = process.env.REACT_APP_API_URL;
      // fetch events from back end
      useEffect(() => {
        async function fetchUsersAndSetState() {
            try {
                // fetch all tools to display
                const result = await get_from(api_url + "users/get-user-list");
                setUserList(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        }
        fetchUsersAndSetState();
    // eslint-disable-next-line
    }, []);

    console.log(userList);

    const handleSearch = async (e) => {
        e.preventDefault();
        //setUserList([e.target.value]);

        var params = {
            name: e.target.uName.value,
            order: e.target.order.value
        }
        try {
            // fetch all filtered users to display
            const result = await get_from(api_url + "users/get-user-list", params);
        
            if(result != "none"){
                setUserList(result);
               
            }
            else{
              setUserList([]);  
            }
            
            
        } catch (error) {
          console.log('Error fetching data:', error);
        }
        
    }

    // Get current posts
    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;

    // Change page
    const paginate = (pageNumber) => { setCurrentPage(pageNumber) };
    const currentList = userList?.slice(indexOfFirstPost, indexOfLastPost);
    return(
        <div className="View-Users">
            <h1 className="pg-title">ALL USERS</h1>
            
            <form className="filters" onSubmit={handleSearch} >
                <input
                    type="text"
                    placeholder="SEARCH NAME"
                    name="uName"
                />
               
                <select name="order">
                    <option value="ASC">ASCENDING</option>
                    <option value="DESC">DESCENDING</option>
                </select>
        
                <button>APPLY</button>
            </form>

            {userList !== undefined ? (
            <>
         
                <table className="userList">
                    
                    <thead>
                        <tr>
                            <th>USER ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                        </tr>
                    </thead>
                    
                    {currentList?.map( (user) => (
                   
                    <tbody className="user-info" key={user.user_id}>
                        <tr>
                            <td className="user-id">{user.user_id}</td>
                            <td>{user.fName} {user.lName}</td>
                            <td>{user.email}</td>
                            <td className="user-options"> 
                                <button>STATS</button>
                                <button>EDIT</button>
                            </td>
                           
                        </tr>
                    </tbody>
                ))}
                </table>
                <Pagination_Pages
                    postsPerPage={usersPerPage}
                    totalPosts={userList?.length}
                    paginate={paginate}
                />
            </>
            ) : (
                <Loading />
            )}
        </div>
    );
};