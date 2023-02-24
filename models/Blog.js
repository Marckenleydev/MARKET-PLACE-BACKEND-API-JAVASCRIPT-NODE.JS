import mongoose from "mongoose"

const BlogSchema =new  mongoose.Schema({

    title:{
        type:String,
        required:true,
       
    },
    description:{
        type:String,
        required:true,
        
      
    },
    category:{
        type:String,
        required:true,
       
        
    },
    numViews:{
        type:Number,
        default:0
            
    },
    isLike:{
        type:Boolean,
        default:false
       
    
    },
    isDisLike:{
        type:Boolean,
        default:false
        
    
    },
    likes:[{
        
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
    }],
    dislikes:[{
        
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
    }],
    image:{
        type:String,
        default:"https://media.istockphoto.com/id/922745190/tr/foto%C4%9Fraf/blogging-blog-kavramlar%C4%B1-fikirleri-ile-worktable.jpg?s=612x612&w=0&k=20&c=KLW2rxPe96Pahhtqr2blHab7q06Zqz9Pqcrq11gOe-o="
    },
    images:{
        type:Array,
    
    },
    author:{
        type:String,
        default:'Marckenley Admin'
    }

}, {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  })

const Blog = mongoose.model("Blog",BlogSchema )
export default Blog