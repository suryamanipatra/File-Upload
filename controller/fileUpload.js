const File  = require("../models/File")

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