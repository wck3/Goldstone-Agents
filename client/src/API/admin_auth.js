import get_from from "./get_from";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin_Auth(){
    const navigate = useNavigate();
    const api_url = process.env.REACT_APP_API_URL;
    // get the role of the user from their session
    useEffect(() => {
    async function fetchSession() {
    try {
        const session = await get_from(api_url + "users/login");
        if(session.user && session.user.role !== "Admin"){
            navigate("/");
        }
    } catch (error) {
    console.error('Error fetching data:', error);
    }
    }
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

return;

}