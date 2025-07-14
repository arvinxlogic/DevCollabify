const express = require("express");

const app = express();

// app.use("/user",(req,res)=>{
//   res.send("hahaha");
// })

// app.get("/ab+c",(req,res)=>{
//   res.send({firstName:"Arvind", lastnName:"Singh"})
// })
// a?bc
// a
//*fly$
// app.get("/user",(req,res)=>{
//   res.send({firstName:"Arvind", lastnName:"Singh"})
// })

app.get("/user/:userId/:name/:password",(req,res)=>{
  console.log(req.params);
  res.send({
    firstName:"Arv",lastnName:"singh"
  })
})
// app.post("/user", (req,res)=>{
//   console.log("Save data to the database");
//   res.send("Data successfully saved to the database")
// })
// app.use("/hello", (req, res) => {
//   res.send("hello hello hello server!");
// });
// app.delete("/user",(req,res)=>{
//   res.send("Deleted successfully")
// })
// app.use("/test", (req, res) => {
//   res.send("hello from the server!");
// });

// app.use("/",(req, res) => {
//   res.send("hello from the server!");
// });

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000");
});
