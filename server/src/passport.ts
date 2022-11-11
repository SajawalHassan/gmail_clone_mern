import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
import User from "./models/User";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (_accessToken: string, _refreshToken: string, profile: any, done) => {
      const user = await User.findById(profile.id);
      if (user) {
        return done(null, user);
      } else {
        await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
          _id: profile.id,
        });
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findById(id);
  done(null, user);
});
