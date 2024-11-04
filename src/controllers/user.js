const usermodel = require('../models/user.js')



const registeruser = async function(req,res){
        let {name,email,phone,status} = req.body
         
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
   
        if (!emailRegex.test(email)) {
            return res.status(400).send({ message: "Invalid email format!" });
        }
    
    
        if (!phoneRegex.test(phone)) {
            return res.status(400).send({ message: "Invalid phone format!" });
        }

let userexist = await usermodel.findOne({ $or: [{ Email: email }, { Phone: phone }] });

if(userexist){
if(userexist.Email== email){
    return res.status(400).send({message:"Email already exist !"})
}


if(userexist.Phone === phone){
    return res.status(400).send({message:"Phone already exist !"})
}
}

else{
    let createNewUser = new usermodel({
        Name:name,
        Email:email,
        Phone:phone,
        Status:"active"
    })
    await createNewUser.save()
    return res.status(201).send({message:"user registered successfully!!"})
}


}




const getuserbyId = async function(req,res){
    let userId = req.params.userid
    let userIdExist = await usermodel.findById(userId)
    if(!userIdExist){
        return res.status(404).send({message:"user not found!"})
    }
    else{
        return res.status(200).send(userIdExist)
    }
}



const getuserdetails  = async function(req,res){

    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 5; 
    const skip = (page - 1) * limit

    let userdetails = await usermodel.find({Status:"active"}).skip(skip).limit(limit);
    if(!userdetails){
        return res.status(404).send({message:"No user found"})
    }

    else{
        return res.status(200).send(userdetails)
    }
}


const updateuserdetails = async function(req, res) {
    try {
      
        const existinguser = await usermodel.findById(req.params.id);
        if (!existinguser) {
            return res.status(404).send({ message: "No user found" });
        }

        const updatedfields = {};

        if (req.body.name && req.body.name !== existinguser.Name) {
            updatedfields.Name = req.body.name;
        }

      
        let emailexists = false;
        let phoneexists = false;

        if (req.body.email && req.body.email !== existinguser.Email) {
            
            emailexists = await usermodel.findOne({ Email: req.body.email, _id: { $ne: req.params.id } });
            if (emailexists) {
                return res.status(400).send({ message: "Email already exists!" });
            }
            updatedfields.Email = req.body.email;
        }

        if (req.body.phone && req.body.phone !== existinguser.Phone) {
           
            phoneexists = await usermodel.findOne({ Phone: req.body.phone, _id: { $ne: req.params.id } });
            if (phoneExists) {
                return res.status(400).send({ message: "Phone already exists!" });
            }
            updatedfields.Phone = req.body.phone;
        }

      
        if (Object.keys(updatedfields).length === 0) {
            return res.status(400).send({ message: "No changes detected" });
        }

     
        const updatedUser = await usermodel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedfields },
            { new: true }
        );

        return res.status(200).send({ message: "User details updated successfully", user: updatedUser });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
}


const deleteuser = async function(req,res){
    let userid = req.params.id
    if(!userid){
        return res.status(404).send({message:"No user found"})
    }
    else{
        let deleteuser = await usermodel.findOneAndUpdate({_id:userid},{$set:{Status:'inactive'}})
        return res.status(200).send({message:"user deleted"})
    }
}




module.exports = {registeruser,getuserbyId,getuserdetails,updateuserdetails,deleteuser}