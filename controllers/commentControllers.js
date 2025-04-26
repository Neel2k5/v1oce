const mongoose=require("mongoose");
const { v4: uuidv4 } = require('uuid');

const {CommentModel} = require("../models/Comment");
const {PostModel} = require("../models/Post");

async function getCommentsByPostUID(req,res) {
    const params=req.params;
    if(!params||!params.postUID)return res.status(400).json({ error: "Missing params" });
   
    try{
        comments = await CommentModel.find(
            {
                postUID:params.postUID,
                //Add pagination here later
            },{_id:0,__v:0}
        );

        if(comments.length===0)return res.status(404).json({error:"No comments exist on this post"});

        return res.status(200).json({message:"Comments on the post",data:comments});

    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    
}

async function postComment(req,res) {
    const params=req.params;
    
    if(!req.body||!req.body.content)return res.status(400).json({ error: "Missing body or field" });
    if(!params||!params.postUID)return res.status(400).json({ error: "Missing params" });
    const {content}=req.body;
    //from middleware
    const userName = req.user.userName;
    const userUID = req.user.userUID;
    if(!userName||!userUID)return res.status(400).json({ error: "Missing user data" });

    try {
        const existanceCheck = await PostModel.findOne({postUID:params.postUID},{_id:0,__v:0});
        if(!existanceCheck)  return res.status(404).json({error:"Post Does not Exist"});

        
        const commentUID = uuidv4();

        const creationResult = await CommentModel.create({
                    commentUID:commentUID,
                    postUID:existanceCheck.postUID,
                    content:content,
                    authorName : userName,
                    authorUID : userUID,
                    createdAt : new Date(),
                });
        return res.status(201).json({message:"Comment Sucessfully Posted",commentUID:commentUID,postUID:existanceCheck.postUID});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {getCommentsByPostUID,postComment};