import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({

     products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
        },
        count:Number,
        color:String,

     }],
     paymentIntent:{},
     orderStatus:{
        type:String,
        default:"Not Processed",
        enum:[
            "Not Processed",
            "Cash on Delivery",
            "Processing",
            "Cancelled",
            "Delivered"]
     },
     orderby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     }

},{timestamps:true})

const Order = mongoose.model("Order",OrderSchema)
export default Order;