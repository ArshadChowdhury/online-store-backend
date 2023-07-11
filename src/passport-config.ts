import passportLocal from "passport-local";
import bcrypt from "bcrypt";

const LocalStrategy = passportLocal.Strategy;

export default function initialize(passport: any, getUserByEmail: any, getUserById:any) {
  const authenticateUser = async (email: any, password: any, done: any) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "No user found with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Passwords do not match" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user: any, done: any) => {done(null, user.id)});
  passport.deserializeUser((id: any, done: any) => {done(null, getUserById(id))});
}
