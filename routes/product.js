import express from "express"
import { AddToWishlist, createProduct, deleteProduct, getAllProduct, getProduct, rating, updateProduct, uploadImages } from "../controllers/product.js"
import { getWishlist } from "../controllers/user.js"
import { productImgResize, uploadPhoto } from "../utils/uploadImg.js"
import { verifyAdmin,verifyUser  } from "../utils/verifyToken.js"

const router = express.Router()

router.post("/", verifyAdmin,createProduct)
router.put("/:id", verifyAdmin,updateProduct )
router.put("/upload/:id", verifyAdmin,uploadPhoto.array('images', 10),productImgResize,uploadImages )
router.delete("/:id", verifyAdmin,deleteProduct )
router.get("/find/:id",verifyUser, getProduct)

router.get("/allproducts",verifyUser, getAllProduct)
router.put("/update/wishlist",verifyUser,AddToWishlist )
router.put("/update/rating",verifyUser,rating )

export default router