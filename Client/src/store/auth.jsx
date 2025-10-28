import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem("token"));
  const [user , setUser] = useState("");
  const [services, setServices] = useState([]);

  const setToken = (key, token) => {
    localStorage.setItem(key, token);
    //set cookie
    cookieStore.set({ name: key, value: token });
    //set token in state
    return setTokenState(token);
    
  };

  const getToken = (key) => localStorage.getItem(key);

  const isLoggedIn = () => !!token;

  const logoutuser = (key) => {
  setTokenState("");
    localStorage.removeItem("token");
    cookieStore.delete("token");
};

//authentication getting loggedin user data from backend
const userAuthenication = async () => {
   try {
    const response = await fetch("http://localhost:8000/user",{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken("token")}`,
        }
    });

    if(response.ok){
        const data = await response.json();
        // console.log("User data:", data.UserData);
        setUser(data.UserData);
    }
    
   } catch (error) {
    console.error("Error fetching user data:", error);
   } 
};

//fetch services from backend
const getServices = async () =>{
    try {
        const response = await fetch("http://localhost:8000/service",{
            method: "GET",
        });
        if(response.ok){
            const data = await response.json();
            console.log("Services data:", data.msg);
            setServices(data.msg);
        }
    } catch (error) {
        console.error("Error fetching services:", error);
    }
};

useEffect(() => {
    getServices();
    if (token) {
        userAuthenication();
    }
}, []);


  return (
    <AuthContext.Provider value={{ setToken, isLoggedIn, getToken, logoutuser,user,services }}>
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