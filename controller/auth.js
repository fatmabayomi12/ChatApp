const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../Models/userModel');


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
      const exisiting = await user.findOne({phone});
          if(exisiting){
              res.status(500).send({
                  success: false,
                  message: "Phone Already Registerd please Login",
                });
          }
      const userPhone = await user.create({
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
        const exisiting = await user.findOne({email});
            if(exisiting){
                res.status(500).send({
                    success: false,
                    message: "Email Already Registerd please Login",
                  });
            }
        //hashing password
        //var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await user.create({
            userName,
            email,
            password : hashedPassword
        })    
        const token = jwt.sign({ id : user.id , userName : user.userName},process.env.JWT_SECRET_KEY,{
        expiresIn : "4d"
        });
        res.status(201).send({
            success: true,
            message: "Successfully Registered",
            token,
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

// Login

const userLogin = async(req , res)=>{
  try{
    const {email , password} = req.body;
    if(!email || !password){
      res.status(500).send({
        success : false,
        message : "Please provide all fields"
      });
    }
    const exisiting = await user.findOne({email})
    if(!exisiting){
      res.status(400).send({
        success : false,
        message : " Invalid email or password"
      });
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
      res.status(400).send({
        success : false,
        message : " Invalid email or password"
      });
    }
    const token = jwt.sign({id : user.id},process.env.JWT_SECRET_KEY,{
      expiresIn : "7d"
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      exisiting,
    });
  }

  catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
  });
}
}

// code Chatgpt
/*
async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Ensure both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find user by email
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server error." });
  }
}
*/




module.exports = {
  createNewAcc,
  registerNewAcc,
  userLogin
};