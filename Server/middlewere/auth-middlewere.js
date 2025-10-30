const jwt = require("jsonwebtoken");
const User = require("../modles/user-modle");

const authMiddlewere = async (req,res,next) =>{
    const token = req.header("Authorization");
    //  console.log("Received Token:", token);
    if(!token){
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    const jwtToken = token.replace("Bearer ","").trim();
    // console.log("Token:", jwtToken);

    try {
        const isValidate = jwt.verify(jwtToken, process.env.KEY);
        // console.log(isValidate);
        const UserData= await User.findOne({email: isValidate.email}).select({password:0, __v:0});
        // console.log("UserData:", UserData);
        req.user = UserData;
        req.token = jwtToken;
        req.userId = isValidate._id;
        next();
        
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
    
}

module.exports = {authMiddlewere};