const User = require("../modles/user-modle");
const bcrypt = require("bcryptjs");

const home = async(req,res) =>{
    try{
        res.status(200).send('Tanmay jana');
    }
    catch(err){
        console.log(err);
    }
};

const signup = async(req,res) =>{

    const { username, email, phone, password,isAdmin } = req.body;

    try{

        const userExits = await User.findOne({ email});

        if(userExits){
            return res.status(400).json({ msg: "Email is already exits"});
        }

        const newUser = await User.create({ username, email, phone, password, isAdmin });
        console.log(newUser);
        res.status(201).json({ user: newUser, token: await newUser.generateToken(),userId: newUser._id.toString(), });
    }
    catch(err){
        console.log(err);
    }
};

//get user details

const login = async (req,res) =>{
    try {
        const { email,password} = req.body;

        const userExits = await User.findOne({email});
        // console.log(userExits);

        if(!userExits){
            return res.status(400).json({ message: "Invalid user name. "});
        }

        const user = await userExits.comparePassword(password);

        if(user){
            return res.status(201).json({ message: "Login sucessful", token: await userExits.generateToken(),userId: userExits._id.toString(), });
        }else{
            return res.status(401).json({ message: "Invalid password" });
        }
        
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

//get user details
const user =async(req,res) =>{
    try {

        // console.log("Hello user");
        // res.status(200).json({ message: "User data fetched successfully", user: req.user });

        const UserData = req.user;
        // console.log(UserData);
        res.status(200).json({ UserData });

        
        
    } catch (error) {
        console.log(error);
    }

};

module.exports = {home, signup, login, user};