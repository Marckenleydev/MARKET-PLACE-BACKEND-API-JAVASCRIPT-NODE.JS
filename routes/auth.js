import express from "express"
import {createUser,forgotPassword,login, resetPassword,sendPassword} from "../controllers/auth.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

// router.get("/checkedauthentication",verifyToken, (req,res,next) =>{
//   next(res.status(200).json("hello user, you are logged in"))

  
// })
// router.get("/checkeduser/:id",verifyUser, (req,res,next) =>{
//   next(res.status(200).json("hello user, you are logged in you can deleted your acount"))
// })


// router.get("/checkedAdmin",verifyAdmin, (req,res,next) =>{
//   next(res.status(200).json("hello user, you are logged in you can do what ever you want"))
// })

router.post("/register", createUser)
router.post("/login", login)
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:id/:resetToken", resetPassword);
router.post("/reset-password/:id/:resetToken",sendPassword);



export default router