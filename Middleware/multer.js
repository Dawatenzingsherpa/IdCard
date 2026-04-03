const multer = require("multer");

const storage = multer.diskStorage({
  
  destination : function(req,file,cb){
    const allowedFiles = ["image/jpeg","image/jpg","image/png"];
    if(!allowedFiles.includes(file.mimetype)){
      cb("error File type is not supported");
      return;
    }else{
      cb(null,"./storage");

    }
  },
  filename  : function(req,file,cb){
    cb(null,Date.now()+"-"+file.originalname);
  }
})


module.exports = {multer,storage};