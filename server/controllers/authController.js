const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getAuth = (req,res)=>{

    res.send("Auth Route Working"); 

}

exports.register = async (req,res)=>{

    try {
        const {name, email , password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: " User alredy exists"
            });
        }

        const hashedpassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashedpassword
        });

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user
        });

    }catch(error) {
         
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.login = (req,res)=>{
    res.send("Login Route Working");
}