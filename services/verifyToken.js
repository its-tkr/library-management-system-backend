const jwt=require('jsonwebtoken');

module.exports={
    auth:(req,res,next)=>{

        const token=req.header('auth-token');
        if(!token) return res.status(401).send('Access Denied');

        try{
            const verify=jwt.verify(token,process.env.SECRET);
            req.user=verify;
            next();
        }
        catch(err){
            res.status(400).send('Invalid Token');
        }
    }
};