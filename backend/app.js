const express = require("express");
const app = express();

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fakdjfkadjf",
      title: "First server-side post",
      content:
        "Praesent laoreet diam eget est pellentesque, et pellentesque ex tristique. Cras et ullamcorper metus, a tempus nunc",
    },
    {
      id: "jsadkjflkjlkjljkj",
      title: "Second server-side post",
      content:
        "Praesent laoreet diam eget est pellentesque, et pellentesque ex tristique. Cras et ullamcorper metus, a tempus nunc",
    },
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts,
  });
});

module.exports = app;
