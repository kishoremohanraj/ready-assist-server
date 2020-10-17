const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./routes/users");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/users", user);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Listening on port " + port + " ...");
});

mongoose
  .connect("mongodb://localhost:27017/userdb", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
