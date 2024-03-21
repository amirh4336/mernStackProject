const { validationResult } = require("express-validator");
const HttpError = require("../models/http-errors");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch {
    const error = new HttpError(
      "Fetching users failed , please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { name, email, password } = req.body;

  let existsingUser;

  try {
    existsingUser = await User.findOne({ email });
  } catch {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existsingUser) {
    return next(
      new HttpError("User exists already, please login instead", 422)
    );
  }

  const createdUser = new User({
    name,
    email,
    image: "https://cdn.zoomg.ir/2024/3/silent-hill-2-main-character.jpg",
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const { email, password } = req.body;

  let existsingUser;

  try {
    existsingUser = await User.findOne({ email });
  } catch {
    const error = new HttpError(
      "logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existsingUser || existsingUser.password !== password) {
    return next(new HttpError("Invalid credntials, could not log you in", 401));
  }

  res.json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
