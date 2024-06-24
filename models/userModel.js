const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({

userName:{
    type:String,
    require:true,
    tirm:true,
    defult:null
},
password:{
    type:String,
    require:true,
    tirm:true,
    defult:null
},
email:{
    type:String,
    require:true,
    tirm:true,
    default:null
   
},

})

const  User = mongoose.model('users',userSchema)

module.exports=  User
