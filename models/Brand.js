import mongoose from "mongoose"


const BrandSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    }
},{timestamps:true})


const Brand = mongoose.model("Brand", BrandSchema)
export default Brand;