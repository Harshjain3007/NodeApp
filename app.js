const express = require('express')

const mongoose = require('mongoose')

const userroutes = require('./src/routes/routes.js')



const app = express()

app.use(express.json())


app.use(express.urlencoded({extented:true}))

app.use('/api/user' ,userroutes)

mongoose.connect("mongodb+srv://root:1234@cluster0.rgnxd.mongodb.net/UserDb?retryWrites=true&w=majority").then(()=>{
    console.log('mongodb is connected')
}).catch(err=>{
    console.log(err.message);
    
})


app.listen(process.env.PORT || 3000 , function(){
    console.log('app is running on' + (process.env.PORT || 3000));
})