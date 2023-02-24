import express from "express"
import { createBlog, deleteBlog, dislikeBlog, getallBlog, getBlog, likeBlog, updateBlog, uploadImages } from "../controllers/blog.js"

import { blogImgResize, uploadPhoto } from "../utils/uploadImg.js"
import { verifyAdmin,verifyUser } from "../utils/verifyToken.js"
const router = express.Router()

router.post("/",verifyAdmin,createBlog)
router.put("/find/:id",verifyAdmin,updateBlog)
router.put("/upload/:id", verifyAdmin,uploadPhoto.array('images', 10),blogImgResize,uploadImages )
router.delete("/:id",verifyAdmin,deleteBlog)
router.get("/find/:id",verifyUser,getBlog)
router.get("/allblogs",verifyUser,getallBlog)
router.put("/likes",verifyUser,likeBlog)
router.put("/dislikes",verifyUser,dislikeBlog)


export default router