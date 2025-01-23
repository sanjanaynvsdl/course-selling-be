const jwt = require('jsonwebtoken');

const secretUserKey = process.env.JWT_USER_SECRET;

function userMiddleware(req,res,next) {
    const token = req.headers.token;

    if(!token) {
        return res.json({
            message:"Not Authorized!"
        })
    }

    try {
        jwt.verify(token,secretUserKey, (err,data)=> {
            if(err) {
                return res.json({
                    msg:"Error in verifying the token,",
                    error:err
                })
            } else {
                req.userId = data.id;
                next();
            }
        })
    } catch (error) {
        return res.json({
            message:"Internal server error in userMiddleware functionality",
            error:error
        })
        
    }

}

module.exports = userMiddleware;