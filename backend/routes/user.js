const {Router} = require("express");
const router = Router()
const {UserModel, PurchaseModel, CourseModel }= require("../schema/db"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {z} = require('zod');
const userMiddleware = require("../middlwares/userMiddlware");

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

router.get("/purchases",userMiddleware,  async(req,res)=> {

    const userId = req.userId;

    try {
        const purchases = await PurchaseModel.find({
            userId:userId,
        })

        const courseData = await CourseModel.find({
            _id: {$in : purchases.map((x)=> x.courseId)}
        })

        return res.status(200).json({
            message:"Fetched all the purchases of this user!",
            purchases:courseData
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in user-purchases functionality!",
            error:error
        })
    }

})



module.exports = router;
