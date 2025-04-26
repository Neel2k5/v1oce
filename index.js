require("dotenv").config()
const express = require("express");
const cookieParser = require("cookie-parser");

const PORT = process.env.SERVER_PORT;
const DB_SERVER = process.env.DB_SERVER;
const DB_NAME =process.env.DB_NAME;


const {connectToMongoDB} = require("./connection");
const {AuthRouter} = require("./routes/authRoutes");
const {PostRouter} = require("./routes/postRoutes");
const {CommentRouter} = require("./routes/commentRoutes");
const {verifyJWT} = require("./middlewares/authMiddleware");

//Database 
const databaseURL=`${DB_SERVER}/${DB_NAME}`;
connectToMongoDB(databaseURL);

const appObj = express();
//Middlewares
appObj.use(express.urlencoded({extended:false}));
appObj.use(express.json());
appObj.use(cookieParser());

appObj.use("/api/auth/",AuthRouter);
appObj.use("/api/post/",verifyJWT,PostRouter);
appObj.use("/api/comment/",verifyJWT,CommentRouter);
appObj.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`);
});
