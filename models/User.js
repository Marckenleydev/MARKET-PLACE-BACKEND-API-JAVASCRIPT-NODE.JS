import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
   
},
lastname:{
    type:String,
    required:true,
    
  
},
email:{
    type:String,
    required:true,
   
    
},
phone:{
    type:String,
    required:true,
    
    
},
password:{
    type:String,
    required:true,

},
passwordChangeAt:Date,
resetToken:String,
resetTokenExpiration:Date,
isAdmin:{
    type:Boolean,
    default:false
},
cart:{
    type:Array,
    default:[]
},
address:{
    type:String,
    default:""
},
wishlist:[{
    type:mongoose.Schema.Types.ObjectId,   
    ref:"Product"
}]

},{timestamps:true})



const User = mongoose.model("User", UserSchema)
export default User
