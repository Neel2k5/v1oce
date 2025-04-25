const express = require("express");

const {registerUser,validateUser,logOutUser} = require("../controllers/authControllers");

const AuthRouter = express.Router();

AuthRouter.post("/register",registerUser);
AuthRouter.post("/login",validateUser);
AuthRouter.post("/logout",logOutUser);

module.exports = {AuthRouter};