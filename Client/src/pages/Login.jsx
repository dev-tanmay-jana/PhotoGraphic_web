import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth.jsx";
import { toast } from 'react-toastify';

const login = () => {
    const [user, setUser] = useState({ 
        email: "", 
        password: ""
    });
    const navigate = useNavigate();
    const {setToken} = useAuth();

    const handleinput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({...user, [name]:value});
        // console.log(name, value);
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        // alert("form submitted");
        // console.log(user);
        try {
            const respond = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            });
            const data = await respond.json();
            // console.log("respond data",data);
            if(respond.status === 201){
                 

                // set token in local storage
                setToken("token", data.token);
                // localStorage.setItem("token", data.token);
                // localStorage.setItem("userId", data.userId);
        
                setUser({ 
                    email: "",
                    password: ""
                });
                toast.success("Registration successful!");
                navigate("/service");
            }
            else{
                toast.error(Array.isArray(data.message) ? data.message[0].message : data.message);
                // navigate("/signup");
            }
            // console.log(respond);
        } catch (error) {
            // console.log("login",error);
            toast.error("Invalid details");
            navigate("/login");
        }
    };

  return (<>
        <section className="signup">
            <main>
                <div className="container">
                    <div className="two_boxes">
                        
                        <div className="form">
                            <form onSubmit={handleSumbit} method="POST" className="singup_form" id="register-form">
                                <h2 className="signupname">Login</h2>
                                <div className="form_group" htmlFor="email">
                                    <label htmlFor="email">
                                        <input type="email" name="email" id="email" autoComplete="off" placeholder="Enter your Email" value={user.email} onChange={handleinput} required/>
                                    </label>
                                </div>
                                
                                <div className="form_group" htmlFor="password">
                                    <label htmlFor="password">
                                        <input type="password" name="password" id="password" autoComplete="off" placeholder="Enter password" value={user.password} onChange={handleinput} required/>
                                    </label>
                                </div>
                                <br/>
                                <button type="submit" name="login" id="login" className="signup_btn">login</button>
                            </form>
                        </div>
                        <div className="image">
                            <img src="\loginpage.jpg" alt="login" className="pic" />
                        </div>
                    </div>
                </div>
            </main>
        </section>

    </>
  );
}

export default login;