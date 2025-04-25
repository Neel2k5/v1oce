const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function verifyJWT(req,res,next){
    const token=req.cookies.token;
    if(!token) return res.status(401).json({error: "Acess denied ; Token Not Found"});

    try{
        const decodedToken = jwt.verify(token,JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    }catch(err){
        console.error(err);
        return res.status(401).json({error: "Acess denied : Invalid Token"});
    }

}


module.exports={verifyJWT};