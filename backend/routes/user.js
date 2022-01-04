const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../schemas/user");
const user = require("../schemas/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Authentication failed; no user found.'
      })
    }
     return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Authentication failed; no user found.'
        })

      }
      const token = jwt.sign({email: user.email, userId: user._id}, 'secret_this_should_be_longer', {expiresIn: "1h"}); //creates new token

  } )
  .catch(err => {
    return res.status(401).json({
      message: 'Authentication failed; no user found.'
    })
  })
})

module.exports = router;
