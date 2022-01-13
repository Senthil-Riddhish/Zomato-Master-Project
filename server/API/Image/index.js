import express from 'express';

import {ImageModel} from '../../Database/image';
//importing the configurations : 
const cloudinary=require('../../config/cloudinary.config');
const upload=require('../../config/multer');
const Router=express.Router();

Router.post("/", upload.array("image",4), async (req, res) => {
    console.log(req.files);
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const saveImageToDataBase=await ImageModel.create({
          images:[{location:result.secure_url}]
      });
        return res.status(200).json({saveImageToDataBase})
    } catch (error) {
      return res.status(500).json({error:error.message});
    }
  });
export default Router;
