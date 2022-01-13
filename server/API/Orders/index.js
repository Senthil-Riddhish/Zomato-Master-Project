import express from 'express';
import {OrderModel} from '../../Database/order';
import passport from 'passport';
const Router=express.Router();
//validate User
import {ValidateUser} from '../../config/validateUser';
/**
 * Route        /getorders
 * Des          Get all orders based on id
 * Params       _id
 * Access       Public
 * Method       Get
 */
Router.get('/:_id',passport.authenticate("jwt"),async(req,res)=>{
    try{
        console.log('inisde get');
        await ValidateUser(req,res);
        const{_id}=req.params;
        const getOrders=await OrderModel.findOne({user:_id});
        if(!getOrders) return res.status(404).json({error:"User not found"});
        return res.status(200).json({orders:getOrders});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

/**
 * Route        /add orders
 * Des          Add new order
 * Params       _id
 * Access       Public
 * Method       post
 */

Router.post('/new/:id',passport.authenticate("jwt"),async(req,res)=>{
    try{
        const{_id}=req.params;
        const{orderDetails}=req.body;
        const addNewOrder=await OrderModel.findOneAndUpdate({
            user:_id
        },{
            $push:{
                //want we want to push
                orderDetails
            }
        },{
            new:true//return the updated data
        });
        return res.status(400).json({order:addNewOrder})
    }catch(error){
        return res.status(500).json({error:error.message});
    }
})
export default Router;