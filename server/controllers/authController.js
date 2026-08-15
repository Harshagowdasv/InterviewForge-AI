const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

exports.login = async (req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success: false,
                message:"user not found"
            })
        };

        const ismatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!ismatch){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );

        return res.status(200).json({
            success:true,
            message:"Login sucessfull",
            token
        });

        

    }catch(error){
        res.status(500).json({
            sucess:false,
            message:error.message
        });
    }
}