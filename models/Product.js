import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
   
},
slug:{
    type:String,
     required:true,
    unique:true,
    lowercase:true
    
  
},
description:{
    type:String,
    required:true,
   
    
},
price:{
    type:Number,
    required:true,
    
    
},
category:{
    // type:mongoose.Schema.Types.ObjectId,
    // ref:"Category"
    type:String,
    required:true,
   

},
quatity:{
    type:Number,
    required:true,
},
sold:{
type:Number,
default:0
},
images:{
    type:Array,

},
color:{
    // type:String,
    // enum:["Black", "red","green","yellow","brown"]
    type:String,
    required:true,
   
},
brand:{
    // type:String,
    // enum:["apple", "samsung","jbl"]
    type:String,
    required:true,
   
},
totalrating:{
    type:Number,
    default:0
},

ratings:[{
   
    star:Number,
    comment: String,
    postedby:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User"
     } 
}]


},{timestamps:true})



const Product = mongoose.model("Product", ProductSchema)
export default Product
