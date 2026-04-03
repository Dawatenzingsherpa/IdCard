const express = require("express");
const connectToDatabase = require("./database");
const app = express();
const IdCard = require("./Model/IdCardModel");
const multer = require("multer");
const { storage } = require("./Middleware/multer");

const fs = require("fs");

app.use(express.json());

connectToDatabase();

const upload = multer({storage : storage});

app.get("/",(req,res)=>{
  res.send("id project");
})

app.get("/idCard",async (req,res)=>{
  const idCard = await IdCard.find();
  res.status(200).json({
    message : "data Fetched successfully",
    data : idCard
  })
})

app.get("/idCard/:id",async (req,res)=>{
  const id = req.params.id;
  const idCard = await IdCard.findById(id);
  res.status(200).json({
    message : "data Fetched successfully",
    data : idCard
  })
})


app.post("/idCard",upload.single("photo"),async (req,res)=>{
  let filename;
  if(req.file){
    filename = "http://localhost:3000/idCard/" + req.file.filename;

  }
  const {name, rollNo,grade, father , mother,contactNo} = req.body;


  await IdCard.create({
    name,
    rollNo,
    grade,
    father,
    mother,
    contactNo,
    photoUrl : filename
  })

  res.status(200).json({
    message : "Data Successfully Created"
  })
})

app.patch('/idCard/:id',upload.single('photo'),async (req,res)=>{
  const id = req.params.id;
    const oldData = await IdCard.findById(id);

  let filename;
  if(req.file){
    const oldPhotoUrl = oldData.photoUrl;
    const url = "http://localhost:3000/idCard/".length;
    const newPhotoUrl = oldPhotoUrl.slice(url);

    fs.unlink(`storage/${newPhotoUrl}`,(error)=>{
      if(error){
        console.log(error);
      }else {
        console.log("file deleted successfully");
      }
    })

    filename = "http://localhost:3000/idCard/" + req.file.filename;
    

  }
  const {name, rollNo,grade, father , mother,contactNo} = req.body;


  await IdCard.findByIdAndUpdate(id,{
    name,
    rollNo,
    grade,
    father,
    mother,
    contactNo,
    photoUrl : filename
  });

  res.status(200).json({
    message : "Data Updated successfully"
  })
})


app.delete('/idCard/:id',async (req,res)=>{
  const id = req.params.id;
  const oldData = await IdCard.findById(id);
  const oldPhotoUrl = oldData.photoUrl;
  const url = "http://localhost:3000/idCard/".length;
  const newPhotoUrl = oldPhotoUrl.slice(url);

  fs.unlink(`storage/${newPhotoUrl}`,(error)=>{
    if(error){
      console.log(error);
    }else {
      console.log("file deleted successfully");
    }
  })

  await IdCard.findByIdAndDelete(id);

  res.status(200).json({
    message : "Data deleted successfully"
  })
})

app.use(express.static('./storage/'));

app.listen(3000,()=>{
  console.log("NodeJs project started in 3000 port");
})