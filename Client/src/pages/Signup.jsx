import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth.jsx";

const Signup = () => {
    const [user, setUser] = useState({
        username: "", 
        email: "", 
        phone: "", 
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
            const respond = await fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    password: user.password
                })
            });
            if(respond.status === 201){
                const data = await respond.json();
                // console.log("respond data",data);

                // set token in local storage
                setToken("token", data.token);
                // localStorage.setItem("token", data.token);
                // localStorage.setItem("userId", data.userId);
        
                setUser({
                    username: "", 
                    email: "", 
                    phone: "", 
                    password: ""
                });
                navigate("/service");
            }

            // console.log(respond);
        } catch (error) {
            // console.log("register",error);
            alert("User already exists");
            navigate("/signup");
        }

    };

  return (<>
        <section className="signup">
            <main>
                <div className="container">
                    <div className="two_boxes">
                        <div className="image">
                            <img src="/signuppage.jpg" alt="signup" className="pic" />
                        </div>
                        <div className="form">
                            <form onSubmit={handleSumbit} method="POST" className="singup_form" id="register-form">
                                <h2 className="signupname">Sign Up</h2>
                                <div className="form_group" htmlFor="username">
                                    <label htmlFor="username">
                                        <input type="text" name="username" id="username" autoComplete="off" placeholder="User name" value={user.username} onChange={handleinput} required/>
                                    </label>
                                </div>
                                <div className="form_group" htmlFor="email">
                                    <label htmlFor="email">
                                        <input type="email" name="email" id="email" autoComplete="off" placeholder="Enter your Email" value={user.email} onChange={handleinput} required/>
                                    </label>
                                </div>
                                <div className="form_group" htmlFor="phone">
                                    <label htmlFor="phone">
                                        <input type="number" name="phone" id="phone" autoComplete="off" placeholder="Enter your phone" value={user.phone} onChange={handleinput} required/>
                                    </label>
                                </div>
                                <div className="form_group" htmlFor="password">
                                    <label htmlFor="password">
                                        <input type="password" name="password" id="password" autoComplete="off" placeholder="Enter password" value={user.password} onChange={handleinput} required/>
                                    </label>
                                </div>
                                <br/>
                                <button type="submit" name="signup" id="signup" className="signup_btn">Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>

    </>
  );
}

export default Signup;