import passport from 'passport';
import JwtPassport from 'passport-jwt';
//validating the user 
import { UserModel } from '../Database/allModels';
//specifying the strategy
const JWTStrategy=JwtPassport.Strategy;
//extract the jwt token automatically
const ExportJwt=JwtPassport.ExtractJwt;
//settings
const options={
    //extract the jwt from the request
    jwtFromRequest:ExportJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:"ZomatoAPP"
};

export default (passport) => {
    passport.use(
      new JWTStrategy(options, async (jwt__payload, done) => {
        try {
          const doesUserExist = await UserModel.findById(jwt__payload.user);
          if (!doesUserExist) return done(null, false);
          return done(null, doesUserExist);
        } catch (error) {
          throw new Error(error);
        }
      })
    );
  };
//jwt__payload contains the content that decoding the token.
