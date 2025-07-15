const express = require("express");

const app = express();
const {adminAuth}=require("./middlewares/auth");


app.use("/admin",adminAuth);
app.get("/user", (req,res)=>{
  res.send("user data sent");
  
})

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
