/*const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    try{
        const token = req.header.token;
        if(token){
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        }
        res.status(401).send({
            success : false,
            message : "no provide token"
        })
    }catch(error){
        res.status(500).send({
            success : false,
            message : "Invalid token"
        })
    }
}*/