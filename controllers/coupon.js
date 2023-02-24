import Coupon from "../models/Coupon.js"

export const createCoupon=async(req,res)=>{

try {
    const coupon = await Coupon.create(req.body);
    return res.status(200).json("Coupon has been created");
} catch (error) {
    return res.status(500).json(error)
}

}

export const updateCoupon=async(req,res)=>{

    try {
        await Coupon.findByIdAndUpdate(req.params.id,
            { $set:req.body}, {new:true})
            res.status(200).json("coupon has been updated")
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteCoupon=async(req,res)=>{

    try {
        await Coupon.findByIdAndDelete(req.params.id)
        res.status(200).json("coupon has been deleted")
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getCoupon=async(req,res)=>{

    try {
      const coupon = await Coupon.findById(req.params.id)
        res.status(200).json(coupon)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getallCoupon=async(req,res)=>{

    try {
      const coupons = await Coupon.find()
        res.status(200).json(coupons)
    } catch (error) {
        return res.status(500).json(error)
    }
}