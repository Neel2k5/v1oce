const express = require("express");

const CommentRouter = express.Router();

CommentRouter.get("/:postUID",()=>{}); // return all if params not provided, if params are there, provide accordingly(In future add paging)
CommentRouter.delete("/:commentUID",()=>{});
CommentRouter.post("/:postUID",()=>{});


module.exports = {CommentRouter};