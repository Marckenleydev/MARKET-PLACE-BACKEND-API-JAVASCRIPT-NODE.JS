    import Category from "../models/Category.js"

    export const createCategory=async(req,res)=>{

        try {
           const  category = await Category.create(req.body);
           res.status(200).json("Category has been created")
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    export const updateCategory=async(req,res)=>{
  
        try {
            await Category.findByIdAndUpdate(req.params.id,{$set:req.body}, {new:true})
            res.status(200).json("Category has been update successfuly")
        } catch (error) {
            return res.status(500).json(error)
            
        }
    
    }
    
    export const deleteCategory=async(req,res)=>{
    
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.status(200).json("Category has been deleted")
        } catch (error) {
             return res.status(500).json(error)
        }
    
    }

    
export const getCategory=async(req,res)=>{

    try {
     const category =  await Category.findById(req.params.id)
   
   
        res.status(200).json(category)
    } catch (error) {
         return res.status(500).json(error)
    }

}

export const getallCategory=async(req,res)=>{

    try {
     const categorys=  await Category.find()
        res.status(200).json(categorys)
    } catch (error) {
         return res.status(500).json(error)
    }

}