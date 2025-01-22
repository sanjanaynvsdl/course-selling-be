const {Router} = require('express');

const adminRoutes = Router()

adminRoutes.post("/signup", async(req,res)=> {

})

adminRoutes.post("/signin", async(req,res)=> {

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