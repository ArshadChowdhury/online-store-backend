import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import initializePassport from "./passport-config";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";
import dotenv from "dotenv";

dotenv.config();

initializePassport(
  passport,
  (email: any) => {
    return users.find((user: any) => user.email === email);
  },
  (id: any) => users.find((user: any) => user.id === id)
);

const users: any = [];

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

const port = 3000;

app.get("/", checkAuthenticated, (req, res) => {
  if (users.length > 0) {
    res.send(users[0]);
  }
});

app.get("/secret", checkAuthenticated, (req, res) => {
  res.send(users[0]);
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successMessage: "Correct user email and password",
  }),
  function (req, res) {
    res.json({ message: "Successfully logged in" });
  }
);

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      profile_image: req.body.profile_image,
    });
    res.json({ message: "Account created!" });
  } catch (err) {
    console.log(err);
  }
});

function checkAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json({ message: "Not authenticated" });
}

function checkNotAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    res.json({ message: "You are authenticated" });
  }
  next();
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
