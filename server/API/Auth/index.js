// Library
import express from "express";
import passport from "passport";
import { UserModel } from "../../Database/user";
// Models

// Validation
import {validationSignin,validationSignup} from '../../validations/auth';

// Create a router
const Router = express.Router();

/**
 * Router       /signup
 * Des          Register new user
 * Params       none
 * Access       Public
 * Method       POST
 */
 Router.post("/signup", async (req, res) => {
  try {
    await validationSignup(req.body.credentials);
    await UserModel.findByEmailAndPhone(req.body.credentials);
    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Router       /signin
 * Des          Sign-in with email and password
 * Params       none
 * Access       Public
 * Method       POST
 */
Router.post("/signin", async (req, res) => {
  try {
    await validationSignin(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Router       /google
 * Des          Google signin
 * Params       none
 * Access       Public
 * Method       GET
 */
Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
        //what are the details required from the google we want to specify not all the things
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/**
 * Router       /google/callback
 * Des          Google signin callback
 * Params       none
 * Access       Public
 * Method       GET
 */
Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res
      .status(200)
      .json({ token: req.session.passport.user.token, status: "success" });
  }
);

export default Router;