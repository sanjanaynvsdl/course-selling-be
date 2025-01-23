const {Router} = require('express');
const {AdminModel} = require("../schema/db")
const {z} = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminRoutes = Router();
const adminMiddleware= require('../middlwares/adminMiddleware');
const { CourseModel}= require("../schema/db")

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

adminRoutes.post("/course", adminMiddleware, async(req,res)=> {
    const {title, description, price, imageUrl} = req.body;
    const adminId = req.userId;

    try {

        //input validation using zod,

        const course = await CourseModel.create({
            title:title,
            description:description,
            price:price,
            imageUrl:imageUrl,
            creatorId:adminId
        })

        return res.status(200).json({
            message:"Successfully created the course!",
            courseId:course._id
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Error in course-add functionality",
            error:error
        })
    }

})

adminRoutes.put("/course",adminMiddleware ,  async(req,res)=> {
    // const courseId = req.params.id;

    // if(!courseId) {
    //     return res.status(403).json({
    //         message:"Please provide the correct course id"
    //     })
    // }

    try {
        const {title,description, price, imageUrl, courseId} = req.body;
        const adminId = req.userId;

        //Admin one mroe filter, only the owner of the course should be able to update thr course details,
        const course = await CourseModel.findOne({
            _id:courseId,
            creatorId:adminId
        });

        if(!course) {
            return res.status(403).json({
                message:"Course with the given id is not present or you are not admin of the course!"
            })
        }
        //updateOne (filter, objToBeUpdated,)
        await CourseModel.updateOne({
            _id:courseId
        }, {
            title:title,
            description:description,
            price:price,
            imageUrl:imageUrl,
            creatorId:adminId
        })

        return res.status(200).json({
            message:"Course updated successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in update course functionality of adminRoutes!"
        })
    }
})

//get-all-courses of admin,
adminRoutes.get("/course/bulk", adminMiddleware , async(req,res)=> {
    const adminId = req.userId;

    try {
        const courses = await CourseModel.find({
            creatorId:adminId,
        })

        return res.status(200).json({
            message:"Fetched all the courses of this admin",
            courses:courses,
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in get-all-courses in adminRoutes"
        })
    }

})

adminRoutes.delete("/course/:id", adminMiddleware , async(req,res)=> {
    const courseId = req.params.id;

    if(!courseId) {
        return res.status(403).json({
            message:"Please provide proper id to search!"
        })
    }

    try {
        const course = await CourseModel.findOne({
            _id:courseId,
        })

        if(course) {
            await CourseModel.deleteOne({
                _id:courseId,
            })
            return res.status(200).json({
                message:"Deleted the course successfully!"
            })
        } else {
            return res.status(403).json({
                message:"Course with the given id is not found to delete!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in delete course functionality in adminRoutes!",
            error:error
        })
    }

})

adminRoutes.post("content", async(req,res)=> {
     

})

module.exports = adminRoutes