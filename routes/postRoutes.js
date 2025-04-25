const express = require("express");

const {newPost,getPostByParams,deletePost,updatePost,getPostByID} = require("../controllers/postControllers");

const PostRouter = express.Router();

PostRouter.get("/",getPostByParams); // provide accordingly(In future add paging)
PostRouter.get("/:postUID",getPostByID);
PostRouter.post("/",newPost);
PostRouter.patch("/:postUID",updatePost);
PostRouter.delete("/:postUID",deletePost);

module.exports = {PostRouter};