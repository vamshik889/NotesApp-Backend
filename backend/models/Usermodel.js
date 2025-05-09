const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    "name":String,
    "age":Number,
    "email":String,
    "password":String
});

const UserModel = mongoose.model("users",userSchema); //users is the collection name

module.exports = {
    UserModel
}