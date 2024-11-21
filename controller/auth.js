const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

// Sign up with Phone
const registerNewAcc = async(req,res) =>{
  try{
      const {phone} = req.body;
          if(!phone){
              res.status(500).send({
                  success: false,
                  message: "Please provide this field",
                });
      }
      const exisiting = await userModel.findOne({phone});
          if(exisiting){
              res.status(500).send({
                  success: false,
                  message: "Phone Already Registerd please Login",
                });
          }
      const userPhone = await userModel.create({
         phone
      }) 
      res.status(201).send({
          success: true,
          message: "Successfully Registered",
          userPhone,
        });
        //const token = jwt.sign({ id : user.id , userName : user.userName},process.env.JWT_SECRET_KEY,{
        //  expiresIn : "4d"
        //});
      } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Error In Register API",
            error,
          });
        }
}


// Sign up with userName , email , password

const createNewAcc = async(req,res) =>{
    try{
        const {userName , email , password} = req.body;
            if(!userName || !email || !password){
                res.status(500).send({
                    success: false,
                    message: "Please provide all fields",
                  });
        }
        const exisiting = await userModel.findOne({email});
            if(exisiting){
                res.status(500).send({
                    success: false,
                    message: "Email Already Registerd please Login",
                  });
            }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({
            userName,
            email,
            password : hashedPassword
        })    
        //const token = jwt.sign({ id : user.id , userName : user.userName},process.env.JWT_SECRET_KEY,{
         // expiresIn : "4d"
        //});
        res.status(201).send({
            success: true,
            message: "Successfully Registered",
            user,
          });
        } catch (error) {
            console.log(error);
            res.status(500).send({
              success: false,
              message: "Error In Register API",
              error,
            });
          }
}


module.exports = {
  createNewAcc,
  registerNewAcc
};