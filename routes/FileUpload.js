const express = require("express")
const router = express.Router();

const {localFileUplaod,imageUpload,videoUpload,imageSizeReducer} = require("../controller/fileUpload");


// api route

router.post("/localFileUplaod",localFileUplaod);
router.post("/imageUpload",imageUpload)
router.post("/videoUpload",videoUpload)
router.post("/imageSizeReducer",imageSizeReducer)



module.exports = router;