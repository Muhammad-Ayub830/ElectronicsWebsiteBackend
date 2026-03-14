const express = require("express");
const Order = require("../models/order.model");


// place order

const place_order = async (req,res) =>{
 const   {customerName,customerEmail,phone,city,address,paymentMethod,items,totalPrice,deliveryFee} = req.body;
   let orderid =  "ORD" + Date.now()
 try {
        const order = await Order.create({
            userId : req.user.userId,
            customerName,
            customerEmail,
            orderNumber : orderid,
            phone,
            address,
            city,
            paymentMethod,
            items ,
            totalPrice,
            deliveryFee

        })
       return  res.status(201).json({success:true,message:"order placed Successfully!"})
    } catch (error) {
        //  console.log(error)
     return   res.status(500).json({success:false,message:error.message})
       
    }
}

// get orders 
const get_orders = async (req,res)=>{
    try {
        const orders = await Order.find();
    return     res.status(200).json({success:true,message:"data fetched successfully",data:orders})
    } catch (error) {
        return res.status(500).json({success:false,message:"fetched failed",error:error.message})
    }
}
const get_my_orders = async (req,res)=>{
    try {
        const orders = await Order.find({userId:req.user.userId});
    return     res.status(200).json({success:true,message:"data fetched successfully",data:orders})
    } catch (error) {
        return res.status(500).json({success:false,message:"fetched failed",error:error.message})
    }
}
module.exports = {place_order,get_orders,get_my_orders}


