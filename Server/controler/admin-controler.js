const User = require("../modles/user-modle");// fixed typo in path
//fetch all contacts
const Contact = require("../modles/contact-model");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // await the async call
    if (!users || users.length === 0) {
      console.log("No users found");
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ users });
  } catch (error) {
    next(error); // now properly defined
  }
};

const getAllContacts = async (req,res,next) =>{
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length === 0){
            console.log("no contacts found");
            return res.status(404).json({message:"no contacts found"});
        }
        // console.log("contacts found:", contacts.length);
        return res.status(200).json({ contacts: contacts });
    } catch (error) {
        next(error);
    }
};

//deleat user by id
const deleatUserById = async (req,res, next ) =>{
    try {
        const userId = req.params.id;
        await User.deleteOne({_id: userId});
        // console.log("deleating user with id:", userId);
        res.status(200).json({message: "User deleated successfully"});
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
//delete contact by id
const deleatContactById = async (req,res,next) =>{
    try {
        const userId = req.params.id;
        await Contact.deleteOne({_id: userId});
        // console.log("deleating user with id:", userId);
        res.status(200).json({message: "User deleated successfully"});
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};
;

//update user by id
const getUserById = async (req,res,next) =>{
    try {
        const userId = req.params.id;
        const data = await User.findOne({_id: userId},{password:0, __v:0});
        // console.log("deleating user with id:", userId);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

const updateUserById = async (req,res) =>{
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;

        const updateUser = await User.updateOne({_id: userId}, {$set: updatedUserData});
        res.status(200).json({message: "User updated successfully", updateUser});

    } catch (error) {
        console.error("Error updating user:", error);
    }
};

module.exports = { getAllUsers, getAllContacts, deleatUserById,getUserById,updateUserById,deleatContactById };