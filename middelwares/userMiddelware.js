const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User= require('../models/userModel')


const loginAuth = async (req,res ,next)=>{
    try{
 const {email, password} = req.body
 const user = await User.findOne({email})
 const match = bcrypt.compare(password, user.password);
 if (!match) {
   return res.status(401).json({ message: 'Invalid email or password' });
 }
 if (!password || !email) {
     return res.status(400).json({ message: 'All fields except required' })
   }
 const token = jwt.sign({ userId: user._id }, process.env.KEY_TOKEN, { expiresIn: '2h' });
 console.log(token)
//  user.token.push(token);
 
  next();
 }catch(error){
     console.log('error loginAuth')
     res.status(500).json({ message: 'error loginAuth', error: error.message });
 }
 };


 module.exports={
    loginAuth,
 }