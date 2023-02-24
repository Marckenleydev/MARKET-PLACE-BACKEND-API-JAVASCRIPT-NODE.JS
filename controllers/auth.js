import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer"




export const createUser = async(req,res)=>{
    const email = ({email:req.body.email})
    const findUser = await User.findOne(email)
    
    try{
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(req.body.password, salt)

       const newUser = new User({
        ...req.body,
        password:hash
       })

        if(!findUser){
           
            const user = await newUser.save()
          return  res.status(200).json(user)
        }
        res.status(501).json("this email already exist")

    }catch(error){
        res.status(500).json(error)

    }
}

export const login =async(req,res,next)=>{

    try{

        const user =await  User.findOne({email:req.body.email})
        if(!user) return res.status(501).json("User not found")

        const isPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!isPassword) return res.status(501).json("Wrong password")

        const token = jwt.sign(
            {id:user._id, isAdmin: user.isAdmin}, process.env.JWT
        )
 
        const { password, isAdmin, ...otherDetails } = user._doc;
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ details: { ...otherDetails }, isAdmin });
      } catch (err) {
        next(err);
      }
    };


   
    export const forgotPassword=async(req,res,next)=>{
        const email = ({email:req.body.email});
     
        try{
          
            const user =await User.findOne(email)

            if(!user){
              return  res.status(501).json("user not found")
            }
            //generate a password reset token 
            const resetToken = jwt.sign(
                {id:user._id, email: user.email}, process.env.JWT,{expiresIn:"5m"}
            );
            user.resetToken = resetToken


    const resetLink = `http://localhost:8800/api/auth/reset-password/${user._id}/${resetToken}`;
    
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "marckenlygbeau@gmail.com",
          pass: "ysbuifrmxfhyqclp",
        },
      });
      
      var mailOptions = {
        from: "testeau@gmail.com",
      to: "marckenlygbeau@gmail.com",
      subject: "Password Reset",
        text: resetLink,
      };
      
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
            return  res.status(200).json("Email sent: " + info.response)
          console.log("Email sent: " + info.response);
        }
      });
            // return res.status(200).json(user.resetToken)
        return res.status(200).json(resetLink)
            // console.log(link)
        }catch(error){
          return  res.status(500).json(error)   

        }
    }


    export const resetPassword=async(req,res,next)=>{
       const {id,resetToken} = req.params;
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(json({status:"User does not exist"}))
        }
        const secretKey= process.env.JWT    
        // res.send(secretKey)
        try{
            const verify =jwt.verify(resetToken,secretKey);
         return   res.send("verified")

        }catch(error){
            // return res.status(500).json("not ver")
           return res.send("not verified")

        }

    }


    
    export const sendPassword=async(req,res,next)=>{
        const {id,resetToken} = req.params;
        const {password} = req.body;


         const user = await User.findById(req.params.id)
         if(!user){
             return res.status(json({status:"User does not exist"}))
         }
         const secretKey= process.env.JWT
         // res.send(secretKey)
         try{
             const verify =jwt.verify(resetToken,secretKey);
             const encryptedPassword = await bcrypt.hash(password,10)
             await User.updateOne({_id:id},{$set:{password:encryptedPassword}})
          return   res.send("password updated")
 
         }catch(error){
             // return res.status(500).json("not ver")
            return res.send("not verified")
 
         }
 
     }
 