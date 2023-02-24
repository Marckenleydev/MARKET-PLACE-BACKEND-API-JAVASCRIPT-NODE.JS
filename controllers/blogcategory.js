import BlogCard from "../models/BlogCategory.js"

export const createBlogCard=async(req,res)=>{

    try {
       const  blogcard = await BlogCard.create(req.body);
       res.status(200).json("BlogCard has been created")
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateBlogCard=async(req,res)=>{

    try {
        await BlogCard.findByIdAndUpdate(req.params.id,{$set:req.body}, {new:true})
        res.status(200).json("BlogCard has been update successfuly")
    } catch (error) {
        return res.status(500).json(error)
        
    }

}

export const deleteBlogCard=async(req,res)=>{

    try {
        await BlogCard.findByIdAndDelete(req.params.id)
        res.status(200).json("BlogCard has been deleted")
    } catch (error) {
         return res.status(500).json(error)
    }

}


export const getBlogCard=async(req,res)=>{

try {
 const blogcard =  await BlogCard.findById(req.params.id)


    res.status(200).json(blogcard)
} catch (error) {
     return res.status(500).json(error)
}

}

export const getallBlogCard=async(req,res)=>{

try {
 const blogcards=  await BlogCard.find()
    res.status(200).json(blogcards)
} catch (error) {
     return res.status(500).json(error)
}

}