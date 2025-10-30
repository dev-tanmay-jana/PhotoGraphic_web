const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    // define your fields here
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        require: true,

    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
    // add more fields as needed
});

//secure the passwpord
userSchema.pre('save', async function(){
    // console.log(this);

    const user = this;

    if(!user.isModified("password")){
        next();
    }

    try {
        //has tghe password
        // const saltRound = 10;
        const has_password = await bcrypt.hash(user.password, 10);
        user.password = has_password;
        
    } catch (error) {
        console.log(error);
    }

});


//json web token
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userid: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.KEY,
            {expiresIn: "30d"},
        );
        
    } catch (error) {
        console.log(error);
        
    }
};

userSchema.methods.comparePassword = async function (Password) {
  return await bcrypt.compare(Password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;