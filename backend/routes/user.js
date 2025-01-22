const {Router} = require("express");
const router = Router()
const {UserModel }= require("../schema/db"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {z} = require('zod')

router.post("/signup", async(req,res)=> {
    const {email, password, firstName, lastName} = req.body;

    console.log(email + password+firstName + lastName);

    const responseObj = z.object({
        email:z.string(),
        password:z.string(),
        firstName:z.string(),
        lastName:z.string()
    })

    const {success , data, error} = await responseObj.safeParse(req.body);

    console.log(success);

    if(!success) {
        return res.json({
            message:"Invalid input format",
            error:error
        })
    }
    try {

        const hashedPass = await bcrypt.hash(password,5);
        console.log(hashedPass);

        await UserModel.create({
            email:email,
            password:hashedPass,
            firstName:firstName,
            lastName:lastName
        })

        return res.status(200).json({
            message:"Signed up successfully!"
        })

    } catch (error) {
        return res.status(500).json({
            message:"Internal server issue in user signup functionality!",
            error:error
        })
    }

})

router.post("/signin", async(req,res)=> {
    const {email, password, firstName, lastName} = req.body;

    const responseObj = z.object({
        email:z.string(),
        password:z.string(),
        firstName:z.string(),
        lastName:z.string()
    })

    const {success , data, error} = await responseObj.safeParse(req.body);

    try {
        const user = await UserModel.findOne({
            email:email,
        })

        if(user) {
            const secretKey= process.env.JWT_USER_SECRET;
            const decodedPass = await bcrypt.compare(password, user.password);

            if(decodedPass) {
                const token = jwt.sign({
                    id:user._id
                }, secretKey)

                return res.json({
                    message:"Successfully logged in",
                    token:token,
                })
            }
        }

        return res.status(403).json({
            message:"Invalid credentials!"
        })

    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in admin sign-in functionality",
            error:error
        })
        
    }

})

router.get("/purchases", async(req,res)=> {
    return res.json({
        message:"Courses purchased by the user"
    })

})



module.exports = router;
