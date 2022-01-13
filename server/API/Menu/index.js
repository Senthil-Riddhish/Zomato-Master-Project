import express from 'express';
import { MenuModel,ImageModel } from "../../Database/allModels";
const Router=express.Router();

/**
 * Route        /list
 * Des          Get all list of menu based on restaurant id
 * Params       _id
 * Access       Public
 * Method       Get
 */

Router.get('/list/:_id',async(req,res)=>{
    try{
        const{_id}=req.params;
        const menu=await MenuModel.findById(_id);
        if(!menu) return res.status(404).json({error:"No found for the Menu model for this Restaurant"});
        return res.json({menu})
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

/**
 * Route        /image
 * Des          Get all list of menu images with restaurant id
 * Params       _id
 * Access       Public
 * Method       Get
 */

Router.get('/image/:_id',async(req,res)=>{
    try{
        const{_id}=req.params;
        const menus=await ImageModel.findById(_id);
        //TODO: VALIDATE IF THE IMAGES ARE PRESENT OR NOT , THROW ERROR IF NOT PRESENT
        if(!menus) return res.status(404).json({error:"No menu found for this restaurant"});
        return res.json({menus})
    }catch(error){
        return res.status(500).json({error:error.message});
    }
})

export default Router;