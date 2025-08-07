const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const predictions = require("./predictions");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  username: {
    type: String,
    unique: true,
  },
  password: String,
  profilePicture: {
    type: String,
    default:
      "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705795200&semt=ais",
  },
  role: {
    type: String,
    default: "patient",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  predictions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Prediction",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
