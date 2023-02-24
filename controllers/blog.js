import Blog from "../models/Blog.js"
import User from "../models/User.js"
import cloudinaryUploading from "../utils/CloudInary.js"
import fs from "fs"

export const createBlog=async(req,res)=>{
    try {
        const newBlog = await Blog.create(req.body)
        res.status(200).json("Blog has been create")
    } catch (error) {
        return res.status(500).json(error)
    }

}

export const updateBlog=async(req,res)=>{
  
    try {
        await Blog.findByIdAndUpdate(req.params.id,{$set:req.body}, {new:true})
        res.status(200).json("Blog has been update successfuly")
    } catch (error) {
        return res.status(500).json(error)
        
    }

}

export const deleteBlog=async(req,res)=>{

    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json("Blog has been deleted")
    } catch (error) {
         return res.status(500).json(error)
    }

}

export const getBlog=async(req,res)=>{

    try {
     const blog =  await Blog.findById(req.params.id)
     .populate("likes").populate("dislikes");
     await Blog.findByIdAndUpdate(req.params.id,
        {$inc:{ numViews:1}},{new:true})
        res.status(200).json(blog)
    } catch (error) {
         return res.status(500).json(error)
    }

}

export const getallBlog=async(req,res)=>{

    try {
     const blogs=  await Blog.find()
        res.status(200).json(blogs)
    } catch (error) {
         return res.status(500).json(error)
    }

}

export const likeBlog=async(req,res)=>{

    const blogId = req.body.blogId;


    // find the blog you want to be like

    const blog= await Blog.findById(blogId)
    // find the login user
    const loginUserId = req.user.id;
    // res.status(200).json(loginUserId)
    // find if the user has disliked the blog
    const isLiked = blog?.isLike
    // find if the user has disliked the blog
    const alreadyDisliked = blog.dislikes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    )

    if(alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
                $pull: {dislikes:loginUserId},
                isDislike:false
            },{new:true})
             res.status(200).json(blog)
    }
    
    if(isLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
                $pull: {likes:loginUserId},
                isLike:false
            },{new:true})
            res.status(200).json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
                $push: {likes:loginUserId},
                isLike:true
            },{new:true})
             res.status(200).json(blog)
    }

}




export const dislikeBlog=async(req,res)=>{

    const blogId = req.body.blogId;


    // find the blog you want to be like

    const blog= await Blog.findById(blogId)
    // find the login user
    const loginUserId = req.user.id;
    // res.status(200).json(loginUserId)
    // find if the user has disliked the blog
    const isDisLike = blog?.isDisLike
    // find if the user has disliked the blog
    const alreadyLiked = blog.likes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    )

    if(alreadyLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
                $pull: {likes:loginUserId},
                isLike:false
            },{new:true})
             res.status(200).json(blog)
    }
    
    if(isDisLike){
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
                $pull: {dislikes:loginUserId},
                isDisLike:false
            },{new:true})
            res.status(200).json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
                $push: {dislikes:loginUserId},
                isDisLike:true
            },{new:true})
             res.status(200).json(blog)
    }

}


export const uploadImages = async(req,res)=>{

    try {
        const uploader = (path)=> cloudinaryUploading(path, "images");
       
        const urls=[];
        const files = req.files;

        for (const file of files){
            const {path} = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }
        const findblog = await Blog.findByIdAndUpdate(req.params.id,
            {
                images:urls.map((file)=> {
                    return file;
                })},
                {
                    new:true
                })

                     return res.status(200).json(findblog)
      
    }catch(error){
        return  res.status(500).json(error)
    }
    

 }