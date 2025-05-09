const express = require("express");
const { UserModel } = require("../models/Usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

//registration
userRouter.post("/register", async (req, res) => {
  const { name, age, email, password } = req.body;

  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        res.send({ message: "error in hashing password" });
        console.log(err, "error in hashing password");
      } else {
        const user = new UserModel({ name, email, password: hash, age });
        await user.save();
        res.status(200).send({ message: "user saved successfully" });
      }
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  //login

  userRouter.post("/login", async (req, res) => {
    //email, password
    //check email in db if matches then unhash the password
    //then generate jwt token and send in the response

    const { email, password } = req.body;
    console.log(email,password)

    if(email && password){
        try {
            const user = await UserModel.findOne({ email }); //checking the 
            console.log(user);
            if (user) {
              bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                  res.status(200).send({ message: "please enter correct password" });
                } else {
                  const token = jwt.sign({ author: user.name , authorId:user.id }, "secret"); //author details we are sending here as payload so that we can use it in the notes routes via auth middleware
                  res.status(200).send({ message: "login successful", token: token });
                }
              });
            } else {
              res.send({ message: "wrong credentials" });
            }
          } catch (error) {
            console.log(error);
            res.status(400).send({ message: "please enter valid email id" });
          }

    }
    else{
        res.status(400).send({message:"enter email and password"})
    }

  });
});

module.exports = {
  userRouter,
};
