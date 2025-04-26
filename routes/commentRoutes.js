const express = require("express");

const {getCommentsByPostUID,postComment} = require("../controllers/commentControllers");
const CommentRouter = express.Router();

CommentRouter.get("/:postUID",getCommentsByPostUID); // return all if params not provided, if params are there, provide accordingly(In future add paging)
CommentRouter.delete("/:commentUID",()=>{});
CommentRouter.post("/:postUID",postComment);


module.exports = {CommentRouter};