const express = require("express");
const connectToDatabase = require("./database");
const app = express();
const IdCard = require("./Model/IdCardModel")

app.use(express.json());

connectToDatabase();

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


app.post("/idCard",async (req,res)=>{
  const {name, rollNo,grade, father , mother,contactNo} = req.body;


  await IdCard.create({
    name,
    rollNo,
    grade,
    father,
    mother,
    contactNo
  })

  res.status(200).json({
    message : "Data Successfully Created"
  })
})

app.patch('/idCard/:id',async (req,res)=>{
  const id = req.params.id;
  const {name, rollNo,grade, father , mother,contactNo} = req.body;


  await IdCard.findByIdAndUpdate(id,{
    name,
    rollNo,
    grade,
    father,
    mother,
    contactNo
  });

  res.status(200).json({
    message : "Data Updated successfully"
  })
})


app.delete('/idCard/:id',async (req,res)=>{
  const id = req.params.id;
  await IdCard.findByIdAndDelete(id);

  res.status(200).json({
    message : "Data deleted successfully"
  })
})



app.listen(3000,()=>{
  console.log("NodeJs project started in 3000 port");
})