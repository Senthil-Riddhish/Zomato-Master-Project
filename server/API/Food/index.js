//Libraries : 
import express from 'express';
//Database Modal : 
import { FoodModel } from '../../Database/allModels';
import { validateCategory } from '../../validations/common';
const Router=express.Router();
/**
 * Route        /:_id
 * Des          Get all food based on the particular Restaurant id
 * Params       none
 * Access       Public
 * Method       Get
 */
Router.get('/r/:_id',async(req,res)=>{
    try{
        await validateCategory(req.params);
        const{_id}=req.params;
        const foods=await FoodModel.find({restaurant:_id});
        return res.json({foods})
    }catch(error){
        return res,json({error:error.message})
    }
});
/**
 * Route        /c/:category
 * Des          Get all food based on the particular id
 * Params       none
 * Access       Public
 * Method       Get
 */
Router.get('/c/:category',async(req,res)=>{
    try{
        await validateCategory(req.params);
        const{category}=req.params;
        const foods=await FoodModel.find({
            category:{$regex:category,$options:"i"}
        });
        if(!foods) return res.status(404).json({error:`Cant able to search for the food ${category}`})
    }catch(error){
        return res,json({error:error.message})
    }
});

export default Router;