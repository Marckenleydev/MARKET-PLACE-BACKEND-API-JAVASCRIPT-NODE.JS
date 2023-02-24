import mongoose from "mongoose"


const BlogCategorySchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    }
},{timestamps:true})


const BlogCategory = mongoose.model("BlogCategory", BlogCategorySchema)
export default BlogCategory;