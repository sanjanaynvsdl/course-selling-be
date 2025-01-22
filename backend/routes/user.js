const {Router} = require("express");
const router = Router()
const {userModel} = require("../schema/db"); 

router.post("/signup", async(req,res)=> {
    return res.json({
        message:"Successfully signed up!"
    })

})

router.post("/signin", async(req,res)=> {
    return res.json({
        message:"Logged in successfully!"
    })

})

router.get("/purchases", async(req,res)=> {
    return res.json({
        message:"Courses purchased by the user"
    })

})



module.exports = router;
