const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer ")) {
        const auth = authHeader.split(" ");
        const token = auth[1];
        const privateKey = process.env.API_SECRET;
        jwt.verify(token, privateKey, function(err,decoded){
            if(err){
                return res.status(401).json({"message": err.message,"code": 401});
            }
            req.loginUser = decoded;
            next();
        }) 
    }else {
        return res.status(401).json({"message": "You could not be authorized","code":401});
    }
}

module.exports = verifyToken;