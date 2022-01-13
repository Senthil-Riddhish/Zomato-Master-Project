import { UserModel}  from "../Database/allModels";
import googleOAuth from "passport-google-oauth20";

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:"78641152649-6722maa5q8ligkog5il6p1bco0ndq11n.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:8080/auth/google/callback",
      },
      //all accesstoken,refreshtoken and profile will come from google
      async (accessToken, refreshToken, profile, done) => {
        // create a new user object
        const newUser = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
        };

        try {
          // check if the user exist
          const user = await UserModel.findOne({ email: newUser.email });

          if (user) {
            // generate token
            const token = user.generateJwtToken();

            // return user
            done(null, { user, token });
          } else {
            // create new user
            const user = await UserModel.create(newUser);

            // generate token
            const token = user.generateJwtToken();

            // return user
            done(null, { user, token });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((userData, done) => done(null, { ...userData }));
  passport.deserializeUser((id, done) => done(null, id));
}