// app create
const express = require("express");
const app = express();

// port find out
require("dotenv").config();
const PORT = process.env.PORT || 3000
// middleware use

app.use(express.json())

const fileupload = require("express-fileupload");
app.use(fileupload());

// DB connect
const db = require("./config/database")
db.connect();

//Cloudinary connect
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect();

// api route map 

const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload",Upload)

// server activate
app.listen(PORT, () =>{
    console.log(`App is Starting at Port no. ${PORT}`)
})
