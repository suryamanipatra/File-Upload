const mongoose = require("mongoose")
require("dotenv").config();
exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewURLParser:true,
        useUnifiedTopology : true
    })  
    .then(console.log("DB Connection Successfull..."))
    .catch((error) => {
        console.log("DB Connection Issue");
        console.error(error);
        process.exit(1);
    })
} 