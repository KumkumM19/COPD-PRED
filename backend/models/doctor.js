const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  email: String,
  username: String,
  password: String,
  profilePicture: {
    type: String,
    default:
      "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705795200&semt=ais",
  },
  role: {
    type: String,
    default: "doctor",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

DoctorSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Doctor", DoctorSchema);
