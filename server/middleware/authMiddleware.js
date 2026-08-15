const jwt = require("jsonwebtoken");

exports.verifyToken = async (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                success:false,
                message:"Authorization header misssing"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    }catch(error){
        return res.status(401).json({
            success : false,
            message: "Invalid Or Expired Token"
        });
    }
};