const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,   
    },
    imageUrl :{
        type:String,
    },
    tags :{
        type:String,
    },
    email :{
        type : String,
    }
})



//post middleware
fileSchema.post("save",async function(doc){
    try{
        console.log(doc);
        //transporter
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth :{
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASSWORD,
            }
        });

        // send mail
        let info = await transporter.sendMail({
            from:`SunDiamond`,
            to: doc.email,
            subject:"New File uploaded in Cloudinary",
            html :`<h2>Hello Mr.${doc.name} </h2> <p>Yor file is uploaded Successfully View Here <a href : "${doc.imageUrl}">${doc.imageUrl}</a> .</p>`
        })
        console.log(info);

    }catch(err){
        console.error(err)
    }
})

const File  = mongoose.model("File",fileSchema);
module.exports = File;