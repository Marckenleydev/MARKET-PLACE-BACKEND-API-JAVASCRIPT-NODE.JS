import mongoose from "mongoose"

const CouponSchema= mongoose.Schema({
name:{
    type:String,
    required:true,
    unique:true,
    uppercase:true
},
expiry:{
    type:Date,
    required:true,

},
discount:{
    type:Number,
    required:true,
}
},{timestamps:true})

const Coupon= mongoose.model("Coupon",CouponSchema);
export default Coupon