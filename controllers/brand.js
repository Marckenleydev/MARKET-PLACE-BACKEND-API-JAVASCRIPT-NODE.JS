import Brand from "../models/Brand.js"

export const createBrand=async(req,res)=>{

    try {
       const  brand = await Brand.create(req.body);
       res.status(200).json("Brand has been created")
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateBrand=async(req,res)=>{

    try {
        await Brand.findByIdAndUpdate(req.params.id,{$set:req.body}, {new:true})
        res.status(200).json("Brand has been update successfuly")
    } catch (error) {
        return res.status(500).json(error)
        
    }

}

export const deleteBrand=async(req,res)=>{

    try {
        await Brand.findByIdAndDelete(req.params.id)
        res.status(200).json("Brand has been deleted")
    } catch (error) {
         return res.status(500).json(error)
    }

}


export const getBrand=async(req,res)=>{

try {
 const brand =  await Brand.findById(req.params.id)


    res.status(200).json(brand)
} catch (error) {
     return res.status(500).json(error)
}

}

export const getallBrand=async(req,res)=>{

try {
 const brands=  await Brand.find()
    res.status(200).json(brands)
} catch (error) {
     return res.status(500).json(error)
}

}