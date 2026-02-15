const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user")
const { validateSignupData } = require("./middlewares/validator")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const {userAuth} = require("./middlewares/auth");
const cookieParser = require("cookie-parser")
const app = express();

app.use(express.json());
app.use(cookieParser());
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

  try {
    console.log(req.body)
    validateSignupData(req)
    const { firstName, lastName, emailID, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
      firstName, lastName, emailID, password: passwordHash,
    });
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message)
  }

});

app.post("/login", async (req, res) => {

  try {
    const { emailID, password } = req.body;
    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("User is not present");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials..");
    } else {
      const token = await jwt.sign({ userId: user._id }, "DevTest@555");
      console.log("Token: ", token);
      res.cookie("token", token);
      res.send("User Logged In..")
    }
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
  }
})

app.get("/me", userAuth, async (req, res) => {
  try {
      res.send(req.user);
  } catch (err) {
    res.status(500).send("ERROR : " + err.message);
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
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.send(users);
    } else {
      res.send("Users collection is empty");
    }
  } catch (err) {
    res.status(500).send("something went wrong..");
  }
})

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["skills", "gender", "profile_image", "age", "phoneNumber",];
    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed")
    }
    const user = await User.findOneAndUpdate({ _id: userId }, data, { runValidators: true, returnDocument: "after" })
    if (user) {
      res.send({
        message: "User Updated successfully",
        data: user,
      });
    } else {
      res.send("not updated")
    }
  } catch (err) {
    res.status(500).send("UPDATE FAILED.." + err.message);
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

