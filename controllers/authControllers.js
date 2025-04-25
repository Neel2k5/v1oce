const mongoose=require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');


const {UserModel} = require("../models/User");

const JWT_LIFE=process.env.JWT_LIFE;
const JWT_LIFE_IN_MS=process.env.JWT_LIFE_IN_MS;
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;

async function registerUser(req,res) {
    if(!req.body) return res.status(400).json({error:"Bad Request : Missing Body"});
    const body=req.body;
    if(!body.userName||!body.email||!body.password) return res.status(400).json({error:"Bad Request : Missing fields"});
    
    try{
        const existanceCheck = await UserModel.findOne({
            userName:body.userName,
            email:body.email,
            },{_id:0});
       
        if(existanceCheck)  return res.status(403).json({error:"User Already Exists with the given credentials"});
        
        const hashPWD = await bcrypt.hash(body.password,12);
        const userUID = uuidv4();
        const creationResult = await UserModel.create({
            userUID: userUID,
            userName:body.userName,
            email:body.email,
            password:hashPWD,
            isAdmin:false
        });
        return res.status(201).json({message:"User Sucessfully Created",userUID:userUID});
        // create  a new entry with hashed pwd
    }catch(err){
        console.error(err);
        return res.status(500).json({error:"Internal Server Error"});
    }

}

async function validateUser(req,res) {
    if(!req.body) return res.status(400).json({error:"Bad Request : Missing Body"});
    const body=req.body;
    if(!body.userName||!body.email||!body.password) return res.status(400).json({error:"Bad Request : Missing fields"});
    try{
        const existanceCheck = await UserModel.findOne({
            userName:body.userName,
            email:body.email,
            },{_id:0});
        
        if(!existanceCheck)  return res.status(404).json({error:"User Does not Exist"});
        
        const token = jwt.sign(
            {
                userName:existanceCheck.userName,
                email:existanceCheck.email,
                userUID:existanceCheck.userUID,
                isAdmin:existanceCheck.isAdmin,
            },
            JWT_SECRET_KEY,
            {
                expiresIn:JWT_LIFE,

            }
        );
        return res.status(200).cookie("token",token,{
            httpOnly:true,
            sameSite:true,
            maxAge:JWT_LIFE_IN_MS,
        }).json({message:"User Logged In"});
        
    }catch(err){
        console.error(err);
        return res.status(500).json({error:"Internal Server Error"});
    }

}

function logOutUser(req,res) {
    res.clearCookie("token",{
        httpOnly:true,
        sameSite:true,
        
    }).status(200).json({message:"Sucessfully Logged Out"});

}

module.exports = {registerUser,validateUser,logOutUser};