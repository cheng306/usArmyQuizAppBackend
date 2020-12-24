const express = require('express');
const app = express();

app.get("/", (req, res)=>{
  res.send("sample response");
})

app.listen(3000, ()=>{
  console.log("for testing purpose");
})