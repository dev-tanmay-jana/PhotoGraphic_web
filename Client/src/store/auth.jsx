import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const API = import.meta.env.BACKEND_API || "http://localhost:8000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem("token"));
  const [user , setUser] = useState("");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      userAuthenication();
    }
  }, [token]);

  const setToken = (key, token) => {
    localStorage.setItem(key, token);
    //set token in state
    setTokenState(token);
    return token;
  };
//   function to check if user is logged in
  const isLoggedIn = () => !!token;
  const getToken = (key) => localStorage.getItem(key);
//  function to logout user
  const logoutuser = (key) => {
    setTokenState("");
    localStorage.removeItem("token");
    setUser("");
    setIsLoading(false);
};

const AuthorizationToken =  `Bearer ${getToken("token")}`;

//authentication getting loggedin user data from backend
const userAuthenication = async () => {
   try {
    setIsLoading(true);
    const response = await fetch(`${API}/user`,{
        method: "GET",
        headers: {
            "Authorization": AuthorizationToken,
        }
    });

    if(response.ok){
        const data = await response.json();
        // console.log("User data:", data.UserData);
        setUser(data.UserData);
        setIsLoading(false);
    }else{
        setIsLoading(false);
        toast.error("Failed to authenticate user");
    }
    
   } catch (error) {
    console.error("Error fetching user data:", error);
    setIsLoading(false);
    toast.error("Error authenticating user: " + error.message);
   } 
};

//fetch services from backend
const getServices = async () =>{
    try {
        const response = await fetch(`${API}/service`,{
            method: "GET",
        });
        if(response.ok){
            const data = await response.json();
            // console.log("Services data:", data.msg);
            setServices(data.msg);
        }
    } catch (error) {
        console.error("Error fetching services:", error);
    }
};

useEffect(() => {
    getServices();
}, []);


  return (
    <AuthContext.Provider value={{ setToken, isLoggedIn, getToken, logoutuser,user,services,AuthorizationToken, isLoading, API }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextProvider = useContext(AuthContext);
  if (!authContextProvider) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return authContextProvider;
};