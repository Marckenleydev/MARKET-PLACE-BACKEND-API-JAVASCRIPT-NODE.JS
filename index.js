import express from "express"
import mongoose from "mongoose"
const app = express();
import dotenv from "dotenv"
import bodyParser from  'body-parser'
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
import blogRoute from "./routes/blog.js"
import couponRoute from "./routes/coupon.js"
import brandRoute from "./routes/brand.js"
import categoryRoute from "./routes/category.js"
import blogcategoryRoute from "./routes/blogcategory.js"
import productRoute from "./routes/product.js"
import passwordRoute from "./routes/resetPassword.js"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser";
dotenv.config()
mongoose.set('strictQuery', true);


const PORT = process.env.PORT || 4000

app.use(cors())
dotenv.config()

app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))

app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
// routes

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/password",passwordRoute)
app.use("/api/product",productRoute )
app.use("/api/blog",blogRoute )
app.use("/api/coupon",couponRoute )
app.use("/api/brand",brandRoute )
app.use("/api/category",categoryRoute)
app.use("/api/blogcategory",blogcategoryRoute)

mongoose.connect(process.env.MONGO_URL ).then(()=>{
    console.log("mongo Db is successfull connected");
    app.listen(PORT , console.log(`server is running at port ${PORT}`))

}).catch((error)=>console.log(error))

