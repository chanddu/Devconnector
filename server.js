import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";

import users from "./routes/api/users";
import profile from "./routes/api/profile";
import posts from "./routes/api/posts";

import keys from "./config/keys";
import passportConfig from "./config/passport";

const app = express();

// Body pasrser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = keys.mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
passportConfig(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
