const mongoose=require("mongoose");
const { v4: uuidv4 } = require('uuid');

const {PostModel} = require("../models/Post");


async function newPost(req,res) {
    try{
    if(!req.body) return res.status(400).json({ error: "Missing Body" });
    if (!req.body.title || !req.body.content || typeof req.body.isPublished !== "boolean") return res.status(400).json({ error: "Invalid or missing fields" });

    const { title, content, isPublished } = req.body;

    const userUID= req.user.userUID;
    const userName = req.user.userName;
    
    if(!userUID||!userName)return res.status(400).json({ error: "Missing user data" });
    
    const postUID = uuidv4();

    const creationResult = await PostModel.create({
                postUID : postUID,
                title : title,
                content : content,
                authorName : userName,
                authorID : userUID,
                isPublished: isPublished,
                updatedAt: new Date(),
                createdAt : new Date(),
            });
    return res.status(201).json({message:"Sucessfully Posted",postUID:postUID});
    
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}
async function getPostByParams(req,res) {
    const userUID= req.user.userUID;
    const userName = req.user.userName;
    
    if(!userUID||!userName)return res.status(400).json({ error: "Missing user data" });

    const query=req.query;
    if(!query)return res.status(400).json({ error: "Missing Queries" });
    const {title,authorName}=query;

    const filter = {};
    if(title) filter["title"]=title;
    if(authorName) {
        if(authorName==="self") filter["authorName"]=userName; //self is done to filter only users posts
        else filter["authorName"]=authorName;
    }

    try{
        let existanceCheck = await PostModel.find(filter,{_id:0,__v:0});
        //filter posts of other people that are not published
        existanceCheck=existanceCheck.filter(i=>i.isPublished===true||i.authorName===userName);
        if(existanceCheck.length==0)  return res.status(404).json({error:"Post Does not Exist"});
        
        return res.status(200).json({message:"OK", postList:existanceCheck});
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    
}
async function deletePost(req,res) {
    const params=req.params;
    if(!params||!params.postUID)return res.status(400).json({ error: "Missing params" });
    const userName = req.user.userName;
    const isAdmin = req.user.isAdmin;
    if(!userName)return res.status(400).json({ error: "Missing user data" });

    try{
        const existanceCheck = await PostModel.findOne({postUID:params.postUID},{_id:0,__v:0});
        if(!existanceCheck)  return res.status(404).json({error:"Post Does not Exist"});

        if(userName!=existanceCheck.authorName&&!isAdmin) return res.status(403).json({error:"Unauthorised Deletion : You are not the author"});

        const deleteResult = await PostModel.deleteOne({postUID:params.postUID});
        if(deleteResult.deletedCount==0)return res.status(404).json({error:"Post Does not Exist"});

        return res.status(200).json({message:"Post Sucessfully Deleted"});

    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}
async function getPostByID(req,res) {
    const params=req.params;
    if(!params||!params.postUID)return res.status(400).json({ error: "Missing params" });
    const userName = req.user.userName;
    const isAdmin = req.user.isAdmin;
    if(!userName)return res.status(400).json({ error: "Missing user data" });

    try{
        const existanceCheck = await PostModel.findOne({postUID:params.postUID},{_id:0,__v:0});
        if(!existanceCheck)  return res.status(404).json({error:"Post Does not Exist"});

        if(userName!=existanceCheck.authorName&&!isAdmin) return res.status(403).json({error:"Unauthorised Deletion : You are not the author"});

        return res.status(200).json({message:"Ok",post:existanceCheck});

    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}
async function updatePost(req,res) {
    const params=req.params;
    if(!params||!params.postUID)return res.status(400).json({ error: "Missing params" });
    const userName = req.user.userName;
    if(!req.body) return res.status(400).json({ error: "Missing Body" });

    if(!userName)return res.status(400).json({ error: "Missing user data" });
    try{
        const existanceCheck = await PostModel.findOne({postUID:params.postUID},{_id:0,__v:0});
        if(!existanceCheck)  return res.status(404).json({error:"Post Does not Exist"});

        if(userName!=existanceCheck.authorName) return res.status(403).json({error:"Unauthorised Editing : You are not the author"});

        const updates = {
            updatedAt : new Date(),
        };
        if(req.body.title) updates["title"]=req.body.title;
        if(req.body.content) updates["content"]=req.body.content;
        if(req.body.isPublished!=null) updates["isPublished"]=req.body.isPublished;

        const updateResult = await PostModel.updateOne({postUID:params.postUID},{$set:updates});
        
        return res.status(200).json({message:"Post Sucessfully Edited"});

    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports={newPost,getPostByParams,deletePost,updatePost,getPostByID};