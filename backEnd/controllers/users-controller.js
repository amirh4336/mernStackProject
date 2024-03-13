const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-errors");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "amir",
    email: "addres.dsfa",
    password: "1234",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};
const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email)

  if (hasUser) {
    return next(
      new HttpError("Could not create user, email already exists.", 401)
    );
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email)

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError("Could not find identify user ,credentials seem to be wrong.", 401)
    );
  }

  res.json({message: "Logged in"})
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
