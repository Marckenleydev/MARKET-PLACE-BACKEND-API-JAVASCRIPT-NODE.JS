import express from "express"
import { createBlogCard, deleteBlogCard, updateBlogCard,getallBlogCard,getBlogCard } from "../controllers/blogcategory.js";
import { verifyAdmin,verifyUser } from "../utils/verifyToken.js";

const router = express.Router();



router.post("/",verifyAdmin,createBlogCard)
router.put("/:id",verifyAdmin,updateBlogCard)
router.delete("/:id",verifyAdmin,deleteBlogCard)
router.get("/find/:id",verifyUser, getBlogCard)
router.get("/allblogcard",verifyUser,getallBlogCard)

export default router