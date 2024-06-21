const { response } = require("express");
const File  = require("../models/File");
const cloudinary = require('cloudinary').v2;


// localfileUpload handler function

exports.localFileUplaod = async(req,res) => { 
    try{
        //fetch the file
        const file = req.files.file;
        console.log("Here is ypur file content : ",file);
        

        // Path of the server where you want to store the file
        let path = __dirname + "/file/" + Date.now() + `.${file.name.split('.')[1]}`;

        file.mv(path, (error) => {
            console.log("PATH -> ",error);
        });
        res.json({
            status : true,
            message : "Local file uploaded Successfully ..."
        });


    }catch(error){
        console.log(error)
    }
}

function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder,quality) {
    const options = { folder };
   if (quality) options.quality = quality;
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
// image Uploader Handler 
exports.imageUpload = async (req, res) => {
    try {

        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // Fetch file 
        const imageFile = req.files.imageFile;
        console.log(imageFile);

        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();
        console.log(fileType)

        // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Upload to Cloudinary
        const response = await uploadFileToCloudinary(imageFile, "SunDiamond");
        console.log(response)


        // // Upload to DB 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })


        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            file: fileData,
            message: "File uploaded successfully",

        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


// videoUploader handler

exports.videoUpload = async(req,res) => {
    try{
        const {name,tags,email} = req.body;
        console.log("Your name:",name,"Your tags:",tags,"Your email:",email);

        const videoFile = req.files.videoFile;
        console.log("Your video file is :", videoFile)

        const supportedTypes = ["mp4", "mov"];
        const fileType = videoFile.name.split('.')[1].toLowerCase();
        console.log(fileType)

        // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }
           console.log("Upload to cloudinary :") 
          // Upload to Cloudinary
          const response = await uploadFileToCloudinary(videoFile, "SunDiamond");
          console.log("Here is your response : ", response)
          const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })


        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            file: fileData,
            message: "Video uploaded successfully",

        })
        

    }catch(err){
        console.log(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}

function bytesToKB(bytes) {
    return (bytes / 1024).toFixed(2); // Convert bytes to KB and round to 2 decimal places
}
//imageSizeReducer Handler

exports.imageSizeReducer = async(req,res) => {
    try{
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // Fetch file 
        const imageFile = req.files.imageFile;
        console.log(imageFile);

        const sizeInKB = bytesToKB(imageFile.size);
        console.log(`File size: ${sizeInKB} KB`);

        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();
        console.log(fileType)

        // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Upload to Cloudinary
        const response = await uploadFileToCloudinary(imageFile, "SunDiamond",30);
        console.log(response)


        // // Upload to DB 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })


        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            file: fileData,
            message: "File uploaded successfully",

        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}