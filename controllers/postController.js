const {Post} = require("../models/postModel")
const jwt=require("jsonwebtoken")

const createPost=async (req,res)=>{
    try{
        let {title, body, device ,no_of_comments} =req.body
        const obj={
            title,
            body,
            device,
            no_of_comments,
            author:req.userId
        }
        // console.log(obj)
        const post=await Post.create(obj)
        res.status(201).json({ post });
    }
    catch(err){
      
        res.status(500).json({ message: 'Error' });
    }
   
}
const getPost=async (req,res)=>{
   
   try{
    const { device, min_comments, max_comments, page } = req.query;
    let skip
    if(page)
    skip = (page - 1) * 3;
    else
    skip=0
   
    let query = { author: req.userId };
    if (device) {
      query.device = device;
    }
    
  if (min_comments) {
      query.no_of_comments = { $gte: min_comments };
    } 
  if (max_comments) {
      if(!query.no_of_comments)
      query.no_of_comments = { $lte: max_comments };
      else
      query.no_of_comments.$lte=max_comments
    }
    // console.log(query)
    const postdata =await Post.find(query).skip(skip).limit(3)
    res.status(200).json(postdata);


   }
   catch(err){
      
    res.status(500).json({ message: 'Error' });
}
}


const gettopPost=async (req,res)=>{
    try{
        const {page}=req.query
        let skip
        if(page)
        skip = (page - 1) * 3;
        else
        skip=0
        const query={author:req.userId}
        console.log(query)
        const postsdata=await Post.find(query).sort({no_of_comments:-1}).skip(skip).limit(3)
        res.status(200).json(postsdata);
    }
    catch(err){
      
        res.status(500).json({ message: 'Top-Error' });
    }
   

}
const updatePost=async (req,res)=>{
    try{
        console.log(req.params.id,req.userId)
         const post=await Post.findById(req.params.id)
        //  console.log(post)
         if(!post)
         res.send("post not found")
         
         if(post.author.toString()!==req.userId)
         res.send("Not authorised")

        //  console.log("lets update")
         const updatedPost=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
         res.status(200).send(updatedPost)
    }
    catch(err){
      
        res.status(500).json({ message: 'Update-Error' });
    }  
}

const deletePost=async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        console.log(post)
        if(!post)
        res.send("post not found")
        
        if(post.author.toString()!==req.userId)
        res.send("Not authorised")
   
        const deletedPost=await Post.findByIdAndDelete(req.params.id)
        res.status(200).send("post deleted")
    }
  
     catch(err){
      
        res.status(500).json({ message: 'Update-Error' });
    } 

}

module.exports={
    getPost,
    createPost,
    gettopPost,
    updatePost,
    deletePost
}