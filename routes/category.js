import express from "express"
import { createCategory, deleteCategory, updateCategory,getallCategory,getCategory } from "../controllers/category.js";
import { verifyAdmin,verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/",verifyAdmin,createCategory)
router.put("/:id",verifyAdmin,updateCategory)
router.delete("/:id",verifyAdmin,deleteCategory)
router.get("/find/:id",verifyUser,getCategory)
router.get("/allcategory",verifyUser,getallCategory)


export default router