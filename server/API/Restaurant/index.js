//Libraries : 
import express from 'express';
//Database Modal : 
import { RestaurantModel } from '../../Database/allModels';
import {validateRestaurantSearchHistory,validateRestaurantcity} from '../../validations/restaurant';
import {validationtId} from '../../validations/common';
const Router=express.Router();

/**
 * Route        /
 * Des          Get all the restaurant details based on the city
 * Params       none
 * Access       Public
 * Method       Get
 */

Router.get('/',async(req,res)=>{
    try{
        await validateRestaurantcity(req.query);
        //(an object) si we can get it easily from the query       
        //http://localhost:4000/restaurant/?city=ncr
        const{city}=req.query;
        const restaurant=await RestaurantModel.find({city});
        if(restaurant.length===0){
            return res.json({error:"No restaurrants found in this city"})
        }
        return res.json({restaurant})
    }catch(error){
        return res.status(500).json({error:error.message})
    }
});
/**
 * Route        /:_id
 * Des          Get the individual restaurnant details based on the id
 * Params       none
 * Access       Public
 * Method       Get
 */

Router.get('/:_id',async(req,res)=>{
    try{
        await validationtId(req.params);
        const{_id}=req.params;
        const restaurant=await RestaurantModel.findById(_id);
        if(!restaurant) return res.status(400).json({error:"Restaurant not fund"})
        return res.json({restaurant})
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

/**
 * Route        /:_id
 * Des          Get restaurant detaisl based on search string
 * Params       none
 * Access       Public
 * Method       Get
 */

Router.get('/search/:searchstring',async(req,res)=>{
    /**
     * SearchString : RajHotel
     * results={
     *      RajHotel,
     *      RajRow
     * }
     */
    await validateRestaurantSearchHistory(req.params); 
    try{
        const{searchstring}=req.params;
        const restaurant=await RestaurantModel.find({
            name:{$regex:searchstring , $options:"i"}
        })
        if(!restaurant) return res.status(404).json({error:`No restaurant with ${searchstring}`});
        return res.json({restaurant});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

export default Router;