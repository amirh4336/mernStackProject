const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  image: {
    type: String,
    required: true,
  },
  places: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Place",
    },
  ],
});

usersSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", usersSchema);
