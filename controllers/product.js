import Product from "../models/Product.js"
import slugify from "slugify"
import fs from "fs"
import User from "../models/User.js";
import cloudinaryUploading from "../utils/CloudInary.js";


export const createProduct =async(req,res,next)=>{
// const product = Product(req.body)

try {
   
    if(req.body.title){
       
        req.body.slug = slugify(req.body.title)
    }
    const newProduct = await Product.create(req.body);
    res.status(200).json("product has been created")
} catch (error) {
    next( res.status(500).json(error)) 
}
}

export  const updateProduct = async(req,res,next)=>{
    try {

     const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
            {$set:req.body},{new:true})
            res.status(200).json(updatedProduct)

        
    } catch (error) {
        next( res.status(500).json(error)) 
    }

}

export const deleteProduct =async(req,res,next)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product has been deleted")
        
    } catch (error) {
        next( res.status(500).json(error)) 
    }

}

export const getProduct =async(req,res,next)=>{
    try {
       const product = await Product.findById(req.params.id)
        res.status(200).json(product)
        
    } catch (error) {
        next( res.status(500).json(error)) 
    }

}

export const getAllProduct =async(req,res,next)=>{
    
    try {
        const queryObj = {...req.query}
        const excludeFieleds = ["page", "sort","limit", "fields"]
        excludeFieleds.forEach((el)=> delete queryObj[el])
        // console.log(queryObj)

        // let query = Product.find(JSON.parse(queryStr))
        

        let queryStr = JSON.stringify(queryObj);
        queryStr= queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`)
        // console.log(queryStr)

        let query = Product.find(JSON.parse(queryStr))

        //sorting
        if(req.query.sort){
            const sortBy= req.query.sort.split(",").join(" ")
            query= query.sort(sortBy) 


        }else{
            query = query.sort("-createdAt")
        }

        //limiting the fields
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit; 

        query= query.skip(skip).limit(limit);
        if(req.query.page){
            const productCount = await Product.countDocuments()
            if(skip >= productCount) return res.status(400).json("this page does not axist") 
        }

        console.log(page, limit, skip);

        if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ")
            query= query.select(fields) 
        }else{ 
            query = query.select("-__v")
        } 

        //pafination

       const products = await (query)
     return   res.status(200).json(products)
        
    } catch (error) {
        next( res.status(500).json(error)) 
    }

}

export const AddToWishlist =async(req,res)=>{

    const {id}= req.user;
    const {prodId}= req.body;


    try {
        const user = await User.findById(id);
        const alreadyAdded= user.wishlist.find((id)=> id.toString()  === prodId);

        if(alreadyAdded){
            let user = await User.findByIdAndUpdate(
                id,
                { 
                    $pull: {wishlist:prodId},
                },
                {
                    new:true
                }
                );
               return res.status(200).json(user);
        }else{
            let user = await User.findByIdAndUpdate(
                id,
                {
                     $push: {wishlist:prodId},
                    },
                    {
                        new:true
                    }
                    );
                    return res.status(200).json(user);

        } 
    } catch (error) {
       return  res.status(500).json(error)
    }
}


 export const rating=async(req,res)=>{

    const {id}= req.user;
    const {star, prodId,comment}=req.body;

    try {
        const product = await Product.findById(prodId);
        let alreadyRated = product.ratings.find((userId)=> userId.postedby.toString() === id.toString())
        if(!alreadyRated){
            const rateProduct= await Product.findByIdAndUpdate(
                prodId,
                {
                    $push:{
                        ratings:{
                            star:star,
                            postedby: id,
                            comment:comment
                        }
                    }
                },
                {
                    new: true, 
                  }
            )
            return res.status(200).json(rateProduct)
        }else{
            const updateProduct= await Product.updateOne(
                {
                    ratings:{$elemMatch:alreadyRated}
                },
                {
                    $set:{"ratings.$.star":star,"ratings.$.comment": comment}
                },
                {
                    new: true,
                  }
            )
            // return res.status(200).json(updateProduct)
        }

        const getallratings = await Product.findById(prodId);
        let totalRating = getallratings.ratings.length;
        let ratingsum = getallratings.ratings
          .map((item) => item.star)
          .reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingsum / totalRating);
        let finalproduct = await Product.findByIdAndUpdate(
          prodId,
          {
            totalrating: totalRating,
          },
          { new: true }
        );

 return res.status(200).json(finalproduct)

    } catch (error) {
        return  res.status(500).json(error)
    }

 }

 export const uploadImages = async(req,res)=>{

    try {
        const uploader = (path)=> cloudinaryUploading(path, "images");
        const urls=[];
        const files = req.files;
       
        // res.status(200).json(findproduct)
        for (const file of files){
            const {path} = file;
            const newpath = await uploader(path);
            urls.push(newpath);        
            fs.unlinkSync(path);
        }
        const findproduct = await Product.findByIdAndUpdate(req.params.id,
            {
                images:urls.map((file)=> {
                    return file;
                })},
                {
                    new:true
                })

                     return res.status(200).json(findproduct)
      
    }catch(error){
        return  res.status(500).json(error)
    }
    

 }

