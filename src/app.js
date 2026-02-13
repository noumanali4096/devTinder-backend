const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express();

app.use(express.json());
// app.use("/profile", (req,res)=>{
//     res.send("Test test test");
// })
// app.use("/user", (req, res, next) => {
//     const token = "xyz";
//     const isAuthorized = token === "xyz";
//     if(!isAuthorized){
//         res.status(401).send("User not authorized");
//     } else{
//         next();
//     }
// })

// app.get("/user/profile", (req, res)=> {
//     res.send({userName: "Noumman Ali", email: "nouman40966@gmail.comm"})
// });

// app.post("/user/profile", (req, res) => {

//     res.send("Data savved to DB..");
// });

// app.put("/user/profile", (req, res) => {
//     res.send("User profile updated");
// });



// app.use("/hello", (req,res)=>{
//     res.send("Hello hello ddddddd");
// })

// app.use("/test", (req,res)=>{
//     res.send("Test test test");
// })

// app.use("/", (req,res)=>{
//     res.send("Root Route");
// })

app.post("/signup", async (req, res) => {

  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user." + err.message)
  }

});

app.get("/user", async (req, res) => {
  const email = req.body.email;
  try {
    const users = await User.find({ emailID: email });
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send("something went wrong..");
  }

});

app.get("/feed", async (req, res) => {
  try{
    const users = await User.find({});
    if(users.length > 0){
      res.send(users);
    } else {
      res.send("Users collection is empty");
    }
  } catch (err) {
    res.status(500).send("something went wrong..");
  }
})

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try{
    const user = await User.findOneAndUpdate({_id: userId}, data)
    if(user){
      res.send("updated successfully");
    } else {
      res.send("not updated")
    }
  } catch (err) {
    res.status(500).send("something went wrong..");
  }
});

connectDB().then(() => {
  console.log("Database Connection established..");
  app.listen(3000, () => {
    console.log("server is listening on port 3000....");
  });
}).catch((err) => {
  console.error("Something not right with the DB connection")
})

