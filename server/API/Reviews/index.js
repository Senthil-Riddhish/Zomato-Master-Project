import express from 'express';
import { ReviewModel } from '../../Database/reviews';
const Router =express.Router();

/**
 * Route        /:_resid
 * Des          Get all the reviews for a particular rest
 * Params       resid
 * Access       Public
 * Method       Get
 */
Router.get('/:resid',async(req,res)=>{
    try{
        const{resid}=req.params;
        const reviews=await ReviewModel.find({restaurants:resid});
        return req.json({reviews});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

/**
 * Route        /new
 * Des          Post : Adding new food/restaurant review and rating
 * Params       resid
 * Access       Public
 * Method       Post
 */
Router.post("/new",async(req,res)=>{
    try{
        const{reviewdata}=req.body;
        await ReviewModel.create({...reviewdata});
        return res.json({reviews:"Successfully created Review"});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

/**
 * Route        /delete
 * Des          delete : Delete a specific review
 * Params       _id
 * Access       Public
 * Method       delete
 */

Router.delete('/delete/:id',async(req,res)=>{
    try{
        const{_id}=req.params;
        await ReviewModel.findByIdAndDelete(_id);
        return res.json({review:"Successfully deleted the review"});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

export default Router;