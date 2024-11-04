const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Phone:{
        type:String,
        required:true,
        unique:true
    },
    Status:{
        type:String,
         enum:['active' , 'inactive' ,'banned']
    }
},{timestamps:true})



module.exports = mongoose.model('user',userSchema)