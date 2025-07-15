const express = require("express");

const app = express();
const { adminAuth } = require("./middlewares/auth");

app.get("/getUserData", (req, res) => {
  try{

    throw new Error("dvaldsf");
    res.send("User Data sent");
  } catch(err){
    res.status(500).send("some eror come");
  }
});
app.use("/", (err, req, res, next) => {
  if (err) res.status(500).send("something went wrong");
});
app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
