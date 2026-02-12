const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express();

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

app.post("/signup", async(req, res) => {
    const user = new User({
        firstName: "Nouman",
        lastName: "Ali",
        emailID: "nouman@test.com",
        password: "Nomi@123",
    });
    await user.save();
    res.send("User Added Successfully");
})

connectDB().then(() => {
    console.log("Database Connection established..");
    app.listen(3000, ()=>{
    console.log("server is listening on port 3000....");
});
}).catch((err) => {
    console.error("Something not right with the DB connection")
})

