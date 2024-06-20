const express = require("express")
const router = express.Router();

const {localFileUplaod} = require("../controller/fileUpload");


// api route

router.post("/localFileUplaod",localFileUplaod);


module.exports = router;