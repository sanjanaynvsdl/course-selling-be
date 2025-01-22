const jwt = require('jsonwebtoken'); 
const secretAdminKey= process.env.JWT_ADMIN_SECRET;   

function adminMiddleware(req,res,next) {
        const token = req.header.token;
    
        if(!token) {
            return res.json({
                message:"Not Authorized!"
            })
        }
    
        try {
            jwt.verify(token,secretAdminKey, (err,data)=> {
                if(err) {
                    return res.json({
                        msg:"Error in verifying the token,",
                        error:err
                    })
                } else {
                    req.userId = data.id;
                    next()
                }
            })
        } catch (error) {
            return res.json({
                message:"Internal server error in userMiddleware functionality",
                error:error
        })     
    }
}

module.exports = adminMiddleware;