const express = require('express');
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json())

app.get("/hello", (req,res)=> {
    res.send("Course-Selling application");
})

app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
})
