import { use, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../store/auth.jsx";

const Logout = () => {
    
    const {logoutuser} = useAuth();
    // useEffect to remove token from local storage
    useEffect(() => {
        logoutuser();
    }, [logoutuser]);
    
    return <Navigate to="/login" />;  
    

};

export default Logout;