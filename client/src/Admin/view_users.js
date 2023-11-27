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
    const [usersPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [userList, setUserList] = useState();
    const api_url = process.env.REACT_APP_API_URL;
    
    Admin_Auth();
    
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
        
            if(result !== "none"){
                setUserList(result);
               
            }
            else{
              setUserList([]);  
            }
            
            
        } catch (error) {
          console.log('Error fetching data:', error);
        }
        
    }

    const handleNew = async (e) => {
        e.preventDefault();
        navigate("/Admin/AddUser")
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
        const uID = e.target.value;
        navigate(`/Admin/EditUser/${uID}`)
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

            <h3 className={"successMsg" + successMsg ? styles.successMsg : "hide"}>{successMsg}</h3>
            
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
                <button onClick={handleNew}>NEW USER</button>
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
                                <button onClick={handleEdit} value={user.user_id}>EDIT</button>
                            </td>
                           
                        </tr>
                    </tbody>
                ))}
                </table>
                <PaginationPages
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