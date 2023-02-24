
import Cart from "../models/Cart.js"
import Coupon from "../models/Coupon.js"
import Product from "../models/Product.js"
import User from "../models/User.js"
import Order from "../models/Order.js"
import uniqid  from "uniqid"


export const updateUser = async(req,res,next)=>{

    try{
        const user = await User.findByIdAndUpdate(req.params.id,
            {$set:req.body}, {new:true})
            res.status(200).json(user)
    }catch(error){
      next( res.status(500).json("user has been updated")) 

    }
}

export const deleteUser=async(req, res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(error){
        next( res.status(500).json(error)) 

    }
}

export const getUser=async(req, res,next)=>{
    try{
       const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(error){
        next( res.status(500).json(error)) 

    }
}

export const getAllUser=async(req, res,next)=>{
    try{
       const users = await User.find()
       return  res.status(200).json(users)
    }catch(error){
        next( res.status(500).json(error)) 

    }
}

export const getWishlist =async(req,res)=>{
    try{
        const user = await User.findById(req.params.id).populate('wishlist')
       return res.status(200).json(user)


    }catch(error){
      return  res.status(500).json(error)
    }
}

export const saveAddress =async(req,res)=>{
    try {

          const user = await User.findByIdAndUpdate(req.params.id,
            {$set:req.body},{new:true})
            return res.status(200).json(user)
    } catch (error) {
        return  res.status(500).json(error)
    }

}

export const userCart=async(req,res)=>{
  const {prod} = req.body
  const { id } = req.user;
    try {
        let products = [];
        const user = await User.findById(id);
        // check if user already have product in cart
        const alreadyExistCart = await Cart.findOne({ orderby: user.id });
        if (alreadyExistCart) {
          alreadyExistCart.remove();
        }
        for (let i = 0; i < prod.length; i++) {
          let object = {};
          object.product = prod[i].id;
          object.count = prod[i].count;
          object.color = prod[i].color;
          let getPrice = await Product.findById(prod[i].id).select("price").exec();
          object.price = getPrice.price;
          products.push(object);
      
    
            
        }
        let cartTotal = 0;
        for(let i =0; i < products.length; i++){
            cartTotal = cartTotal + products[i].price * products[i].count;
        }
        console.log(cartTotal)
        console.log(products)
        let newCart = await new Cart({
            products,
            cartTotal,
            orderby:user?.id
        }).save()
        return res.status(200).json(newCart)

          
    } catch (error) {
        return  res.status(500).json(error)
    }

}

export const getUserCart =async(req,res)=>{
    const {id}= req.user;
    try{
        const cart = await Cart.findOne({orderby:id}).populate(
            "products.product"
        )
        return res.status(200).json(cart)
    }catch(error){
        return  res.status(500).json(error)

    }
}
export const emptyCart=async(req,res)=>{

    const {id} = req.user;

    try{
        const user = await  User.findById(id);
        const cart = await Cart.findOneAndRemove({orderby:user.id})
        return res.status(200).json(cart)
    }catch(error){
        return  res.status(500).json(error)

    }

}

export const applyCoupon =async(req,res)=>{

    try {
        const {coupon} = req.body;
        const {id}= req.user;
        const validCoupon = await Coupon.findOne({name:coupon});
        

        if(validCoupon ===null){
            return res.status(501).json("Invalid Coupon")
           
        }
      
        const user = await User.findOne({ _id:id });
        
        
        let  cartTotal  = await Cart.findOne({
          orderby: user.id,
        }).populate("products.product");

        
        let totalCart =cartTotal.cartTotal 
        // return res.status(200).json(totalCart)
        
       
        let totalAfterDiscount =  (
            totalCart -
          (totalCart * validCoupon.discount) / 100
        ).toFixed(2);
       
    
        await Cart.findOneAndUpdate(
          { orderby: user.id },
          { totalAfterDiscount },
          { new: true }
        );
       return res.status(200).json(totalAfterDiscount)


        
    } catch (error) {
        return  res.status(500).json(error)
    }
}


export const createOrder= async(req,res)=>{
    const { COD, couponApplied } = req.body;
    const { id } = req.user;
   
    try {
      if (!COD) throw new Error("Create cash order failed");
      const user = await User.findById(id);
      let userCart = await Cart.findOne({ orderby: user.id });
     
      let finalAmout = 0;
      if (couponApplied && userCart.totalAfterDiscount) {
        finalAmout = userCart.totalAfterDiscount;
      } else {
        finalAmout = userCart.cartTotal;
      }
      
  
      let newOrder = await new Order({
        products: userCart.products,
       
        paymentIntent: {
          id: uniqid(),
          method: "COD",
          amount: finalAmout,
          status: "Cash on Delivery",
          created: Date.now(),
          currency: "usd",
        },
        orderby: user.id,
        orderStatus: "Cash on Delivery",
      }).save();
    //   return  res.json(newOrder);
      let update = userCart.products.map((item) => {
        return {
          updateOne: {
            filter: { id: item.product.id },
            update: { $inc: { quantity: -item.count, sold: +item.count } },
          },
        };
      });
      const updated = await Product.bulkWrite(update, {});
     return  res.json("success");
    } catch (error) {
     return res.status(500).json(error)
    }
  };
  

  export const getOrders=async(req,res)=>{
    const {id} = req.user;

    try{
        const userorders = await Order.findOne({orderby:id})
        .populate("products.product").exec();
        return res.status(200).json(userorders)

    }catch(error){
        return res.status(500).json(error)

    }
  }
 
  export const getOrderByuserId=async(req,res)=>{
    const {id} = req.params;


    try {
      const usersorders = await Order.findOne({orderby:id})
      .populate("products.product")
      .populate("orderby")
      .exec();
      return res.status(500).json(usersorders);
      
    } catch (error) {
      return res.status(500).json(error)
    }

  }


  export const updateOrderStatus=async(req,res)=>{

    const { status } = req.body;
    const { id } = req.params;

    try {
      const updateOrderStatus = await Order.findByIdAndUpdate(
        id,
        {
          orderStatus: status,
          paymentIntent: {
            status: status,
          },
        },
        { new: true }
      );
        return res.status(200).json(updateOrderStatus) 
    }catch(error){
      return res.status(500).json(error)

    }

  }