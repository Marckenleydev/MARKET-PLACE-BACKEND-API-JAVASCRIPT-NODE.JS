import express from "express"
import { createCoupon, deleteCoupon, getCoupon, updateCoupon,getallCoupon } from "../controllers/coupon.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()
router.post("/",verifyAdmin,createCoupon)
router.put("/:id",verifyAdmin,updateCoupon)
router.delete("/:id",verifyAdmin,deleteCoupon)
router.get("/:id",verifyAdmin,getCoupon)
router.get("/find/allcoupons",verifyAdmin,getallCoupon)

export default router