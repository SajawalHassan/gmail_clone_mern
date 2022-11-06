import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
    },
    (accessToken: string, refreshToken: string, user: object, callback) => {
      callback(null, user);
    }
  )
);

passport.serializeUser((user: object, done) => {
  done(null, user);
});

passport.deserializeUser((user: object, done) => {
  done(null, user);
});
