import express from "express"
import { createBrand, deleteBrand, updateBrand,getallBrand,getBrand } from "../controllers/brand.js";
import { verifyAdmin,verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/",verifyAdmin,createBrand)
router.put("/:id",verifyAdmin,updateBrand)
router.delete("/:id",verifyAdmin,deleteBrand)
router.get("/find/:id",verifyUser,getBrand)
router.get("/allbrand",verifyUser,getallBrand)


export default router