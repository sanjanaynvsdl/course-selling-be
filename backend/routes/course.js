const {Router} = require("express");
const userMiddleware = require("../middlwares/userMiddlware");
const { PurchaseModel, CourseModel } = require("../schema/db");
const router = Router();

router.post("/purchase", userMiddleware, async(req,res)=> {
    //we expect user-to payment (but here in this case we aren't doin,)
    const userId = req.userId;
    const courseId = req.body.courseId;

    try {
        //Here we have to check the payment 
        await PurchaseModel.create({
            userId,
            courseId
        })

        
        return res.json({
            message:"Purchased the course successfully!"
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Error in purchasing course functionality!",
            error:error
        })
    }
})

router.get("/preview", async(req,res)=> {
    try {
        const courses  = await CourseModel.find({})
        return res.status(200).json({
            courses:courses,
            message:"Fetched all the courses successfully!"
        })
    } catch (error) {

        return res.status(500).json({
            message:"Internal server error in preiview - course functionality ",
            error:error
        })
        
    }
})

module.exports = router;