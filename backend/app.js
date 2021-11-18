const express = require("express");

const mongoose = require("mongoose");

const postRoutes = require("./routes/posts");

const app = express();

// const connection =
//   "mongodb+srv://cschneider:4lzcVb1aLhlDmbaR@cluster0.bev39.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// mongoose.connect(connection, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", () => console.error("connection error:"));
// db.once("open", () => {
//   console.log("connected");
// });

mongoose
  .connect(
    "mongodb+srv://cschneider:4lzcVb1aLhlDmbaR@cluster0.bev39.mongodb.net/mean-course?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);

module.exports = app;
