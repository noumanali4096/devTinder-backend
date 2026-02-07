const express = require("express");

const app = express();


app.use("/hello", (req,res)=>{
    res.send("Hello hello ddddddd");
})

app.use("/test", (req,res)=>{
    res.send("Test test test");
})

app.use("/", (req,res)=>{
    res.send("Root Route");
})

app.listen(3000, ()=>{
    console.log("server is listening on port 3000....");
});