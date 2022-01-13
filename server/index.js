// Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
require('dotenv').config();
import './Database/connection'

//for google Authentication
import passport from 'passport';

//importing google  Configurations ...
import googleAuthConfig from './config/google.config';
//private route authentication config
import privateRouteConfig from "./config/route.config";

//validation
import {validationSignin,validationSignup} from './validations/auth';

const port ="8000";
const zomato = express();


import Restaurant from './API/Restaurant';
import Food from './API/Food';
import Menus from './API/Menu';
import Image from './API/Image';
import Orders from './API/Orders';
import Review from './API/Reviews';
import User from './API/User';

// Application middlewares
zomato.use(cors());
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
//We are using with express we want to initialise the passport
//Creating the sessions to use inside the passport
zomato.use(passport.initialize());//passport is kind of a middlewares it knows when this passport has tio initialse throughout the project
//session now it will be accessible through our pplicstion so we can make use of this passport
//passport configuration
//in the callback will the get the complete information in that url
googleAuthConfig(passport);//passport is defined in the configurations
privateRouteConfig(passport);

import Auth from './API/Auth';

zomato.use("/auth", Auth);
zomato.use("/restaurant",Restaurant);
zomato.use("/food",Food);
zomato.use("/menu",Menus);
zomato.use('/upload',Image);
zomato.use('/order',Orders);
zomato.use('/review',Review);
zomato.use('/user',User);

zomato.listen(port, () =>
  console.log('Server is running...')
);