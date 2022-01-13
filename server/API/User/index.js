import express from "express";
import { UserModel } from "../../Database/user";
const Router=express.Router();

/**
 * Route        /:_id
 * Des          Get user data
 * Params       _id
 * Access       Public
 * Method       get
 */

Router.get('/:_id',async(req,res)=>{
    try{
        const{_id}=req.params;
        const getUser=await UserModel.findById(_id);
        if(!getUser) return res.status(404).json("User not found");
        return res.json({user:getUser});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

/**
 * Route        /update
 * Des          Update user data
 * Params       _id
 * Access       Public
 * Method       put
 */
Router.put("/update/:userid",async(req,res)=>{
    try{
        const{userid}=req.params;
        const{userdata}=req.body;
        const updateUserData=await UserModel.findByIdAndUpdate(userid,
        {
            $set:userdata
        },
        {
            new:true
        });
        return res.json({user:updateUserData});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
})

export default Router;
