const {User}= require("../models/userModel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userRegister=async (req,res)=>{
    try{
        const { name, email, gender, password, age, city, is_married } = req.body;

        const user = await User.findOne({ email });
        if (user) {
          return res.json({ message: 'User already exists, please login' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser=await User.create({name, email, gender, password:hashedPassword, age, city, is_married})

        res.status(201).json(newuser);
    }
    catch(err){
        res.status(500).json({ message: 'Error' });
    }
}

const userLogin = async (req,res)=>{
    try{
        
           const {email,password} = req.body
           const userPresent= await User.find({email})
           
           if(!userPresent)
           res.json("User is not present")
           const check=await bcrypt.compare(password,userPresent[0].password)
           console.log(check)
           if(!check){
            res.json("invalid credentials")
           }
           
           const token=jwt.sign({userId:userPresent[0]._id},process.env.secret)

           res.json({email,token})
           


    }
    catch(err){
      
        res.status(500).json({ message: 'Error' });
    }
}

module.exports={
    userRegister,
    userLogin
}