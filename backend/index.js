const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose')

const userRoutes = require("./routes/user")
const courseRoutes = require("./routes/course")
const adminRoutes = require("./routes/admin");

const PORT = process.env.PORT;
const app = express();

app.use(express.json())
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/hello", (req,res)=> {
    res.send("Course-Selling application");
})


async function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
    console.log("Successfuly connected to the database")
    app.listen(PORT,()=> {
        console.log(`Server is running on http://localhost:${PORT}`);
    })

    })
    .catch((err)=> {
        console.log(`Error while connecting to DB : ${err}`)
    })
}

connectDB()

