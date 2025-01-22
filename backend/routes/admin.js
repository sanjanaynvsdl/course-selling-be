const {Router} = require('express');
const {AdminModel} = require("../schema/db")
const {z} = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminRoutes = Router()

adminRoutes.post("/signup", async(req,res)=> {
    const {email, password, firstName, lastName} = req.body;

    const responseObj = z.object({
        email:z.string(),
        password:z.string(),
        firstName:z.string(),
        lastName:z.string()
    })

    const {success , data, error} = await responseObj.safeParse(req.body);

    if(!success) {
        return res.json({
            message:"Invalid input format",
            error:error
        })
    }
    try {

        const hashedPass = await bcrypt.hash(password,5);

        await AdminModel.create({
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
            message:"Internal server issue in admin signup functionality!",
            error:error
        })
        
    }

})

adminRoutes.post("/signin", async(req,res)=> {
    const {email, password, firstName, lastName} = req.body;

    const responseObj = z.object({
        email:z.string(),
        password:z.string(),
        firstName:z.string(),
        lastName:z.string()
    })

    const {success , data, error} = await responseObj.safeParse(req.body);

    try {
        const user = await AdminModel.findOne({
            email:email,
        })

        if(user) {
            const secretKey= process.env.JWT_ADMIN_SECRET;
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

adminRoutes.post("/course", async(req,res)=> {

})

adminRoutes.put("/course", async(req,res)=> {

})

//get-all-courses of admin,
adminRoutes.get("/course/bulk", async(req,res)=> {

})

adminRoutes.delete("/course/:id", async(req,res)=> {

})

adminRoutes.post("content", async(req,res)=> {

})

module.exports = adminRoutes