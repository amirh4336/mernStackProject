const { v4: uuidv4 } = require("uuid");

// const HttpError = require("../models/http-errors");

let DUMMY_USERS = [
  {
    userName: "u1",
    email: "addres.dsfa",
    password: "1234",
  },
];

const getAllUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};
const signup = (req, res, next) => {
  const { userName, email, password } = req.body;

  const createUser = {
    id: uuidv4(),
    userName,
    email,
    password,
  };

  DUMMY_USERS.push(createUser);

  res.status(201).json({ user: createUser });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
