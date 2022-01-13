import joi from 'joi';
import { Schema } from 'mongoose';

export const validationSignup =(userData)=>{
    const Schema=joi.object({
        fullName :joi.string().required().min(5).max(30),
        email:joi.string().email().required(),
        password:joi.string().min(5),
        address:joi
        .array()
        .items(joi.object({detail:joi.string(),for:joi.string()})),
        phoneNumber:joi.number()
    });
    //Validate the data asynchronisly
    return Schema.validateAsync(userData);
}

export const validationSignin = (userData)=>{
    const Schema=joi.object({
        email:joi.string().email().required(),
        password:joi.string().required()
    })
    return Schema.validateAsync(userData);
}