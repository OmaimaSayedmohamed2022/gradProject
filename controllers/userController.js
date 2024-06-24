const User = require('../models/userModel')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
require('dotenv').config();
const {validateEmail,validatePassword,validateString}= require("../middelwares/validation")


/// create New User ///
const  createNewUser= async(req ,res)=>{
    try{
  const {userName,password ,email}=req.body;

  if (!validateString(userName)) 
    return res.status(400).json({ message: 'Invalid username' });
  if (!validateEmail(email)) 
    return res.status(400).json({message: 'Invalid Email' });
if (!validatePassword(password)) 
    return res.status(400).json({message: 'Invalid password' });

 const hashedPassword = await bcrypt.hash(password, 10)

  console.log(hashedPassword)

  const user = new User({userName,email,password:hashedPassword})

  await user.save();
  res.status(200).json({message:"create new user successfully", user})
  }
  catch(error){
      res.status(500).json({ message: 'Error creating user', error: error.message });
      }
  }

///update User Profile//
  const updateUserProfile = async (req, res) => {
    try {
      const { id, userName, email, password } = req.body;
      if (!validateString(userName)) 
        return res.status(400).json({ message: 'Invalid username' });
      if (!validateEmail(email)) 
        return res.status(400).json({message: 'Invalid Email' });
    if (!validatePassword(password)) 
        return res.status(400).json({message: 'Invalid password' });

      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.userName = userName;
      user.email = email;
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      const updatedUser = await user.save();
  
      res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      console.error('Error updating user', error);
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  }

  /// delete user ///
  const deleteUser = async(req , res )=>{
    try{
      const {id} = req.body;
    if (!id){
    return res.status(400).json({message:'user id required'})
     }
     const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser){
    return res.status(400).json({status:0 , message:"user not found"})
    }
    res.status(200).json({status:1 , message:`user deleted successfully`})
    } 
    catch (error) {
  console.error('Error deleting user:', error);
  res.status(500).json({ status : 0 , message: 'Error deleting user' });
}
};

///get all users ///
const getAllUsers = async (req, res) => {
   try {
    const users = await User.find().select('-password');
         res.json(users);
    } catch (error) {
      console.error('Error getting all users:', error);
      res.status(500).json({ message: 'Error getting all users' });
  }
};

///login///
const loginUser= async(req,res)=>{
 try{
const {email,password} = req.body;
const user = await User.findOne({email})

if (!validateEmail(email)) 
    return res.status(400).json({message: 'Invalid Email' });

await user.save()

return res.status(201).send({message:'user login successfully'})

 }catch(error){
 console.log('error in login',error)
 return res.status(500).send({message:'error in login ',error:error.message})
}
}




module.exports={
    createNewUser,
    updateUserProfile,
    deleteUser,
    getAllUsers,
    loginUser
}