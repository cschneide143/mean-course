const express = require("express");
const app = express();

const mongoose = require("mongoose");

const Post = require("./schemas/post");

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully!",
      postId: createdPost._id,
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;
