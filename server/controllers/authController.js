exports.getAuth = (req,res)=>{
    res.send("Auth Route Working"); 
}

exports.register = (req,res)=>{
    console.log(req.body);
    res.json({
        "sucess":true,
        "message":"Registration Is Sucessfully completed"
    });
}

exports.login = (req,res)=>{
    res.send("Login Route Working");
}