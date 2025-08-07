const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();
var passport = require("passport");
var session = require("express-session");
const User = require("./models/user");
const Doctor = require("./models/doctor");
const LabTechnician = require("./models/labTechnician");
const Admin = require("./models/admin");
const Prediction = require("./models/predictions");

const SENDMAIL = require("./controllers/sendEmail");
const HTML_TEMPLATE = require("./mail-template");

const app = express();

const Port = process.env.PORT || 3000;
const CONNECTION_URL =
  process.env.CONNECTION_URL
app.use(cors());
app.use(express.json());

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(passport.authenticate("session"));
app.use(passport.session());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

var passport = require("passport");
var LocalStrategy = require("passport-local");
const user = require("./models/user");

passport.use("user", new LocalStrategy(User.authenticate()));
passport.use("doctor", new LocalStrategy(Doctor.authenticate()));
passport.use("lab-technician", new LocalStrategy(LabTechnician.authenticate()));
passport.use("admin", new LocalStrategy(Admin.authenticate()));

app.post("/api/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  let Schema;
  if (role === "admin") {
    Schema = Admin;
  } else if (role === "doctor") {
    Schema = Doctor;
  } else if (role === "lab-technician") {
    Schema = LabTechnician;
  } else {
    Schema = User;
  }

  try {
    const newUser = new Schema({ name, username: email, role });
    await Schema.register(newUser, password);
    const message = `
      Hi ${name}, your account has been created successfully.
      <br><br>
      
      Here are your credentials:<br><br>
      - Email: ${email}<br><br>
      - Role Assigned: ${role}<br><br>
      - Password: ${password} (Please keep this password secure)<br><br>

      You can now log in and access COPD PRED.<br>
    `;
    const options = {
      from: "kum19mittal03@gmail.com",
      to: email,
      subject: "COPD PRED Account Credentials",
      text: message,
      html: HTML_TEMPLATE(message),
    };

    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });
    res.status(200).send("True");
  } catch (error) {
    console.error(error);
    res.status(400).send("User already exists or registration failed");
  }
});

app.get("/login/success", (req, res) => {
  res.status(200).send("Success");
});

app.get("/login/failure", (req, res) => {
  res.status(400).send("Failure");
});

app.post("/api/login", (req, res, next) => {
  const { username, password, role } = req.body;

  if (!role || !["user", "doctor", "lab-technician", "admin"].includes(role)) {
    return res.status(400).send("Invalid role specified.");
  }

  passport.authenticate(role, (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(400).send("An error occurred during authentication.");
    }
    if (!user) {
      return res.status(400).send("Invalid username or password.");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(400).send("Login failed.");
      }

      let redirectUrl;
      if (role === "admin") {
        redirectUrl = `/admin/dashboard?username=${username}&userId=${user._id}&role=${role}`;
      } else if (role === "doctor") {
        redirectUrl = `/doctor/dashboard?username=${username}&userId=${user._id}&role=${role}`;
      } else if (role === "lab-technician") {
        redirectUrl = `/pred?username=${username}&userId=${user._id}&role=${role}`;
      } else {
        redirectUrl = `/patient/dashboard?username=${username}&userId=${user._id}&role=${role}`;
      }

      return res.status(200).send({
        message: "Success",
        userId: user._id,
        redirectUrl: redirectUrl,
        isAdmin: role === "admin",
      });
    });
  })(req, res, next);
});

app.post("/api/logout", async (req, res) => {
  req.logout(function (err) {
    if (err) {
      res.status(400).send("Failure");
    }
    res.status(200).send("Success");
  });
});

app.post("/api/pred", async (req, res) => {
  const features = Object.entries(req.body.data).map(([name, value]) => ({
    name,
    value,
  }));

  const prediction = new Prediction({
    features: features,
    prediction_gold_grade: req.body.prediction,
    probability_gold_grade: req.body.probability.map(String),
    prediction_gold_class: req.body.prediction_gold_class,
    probability_gold_class: req.body.probability_gold_class.map(String),
  });

  await prediction.save();

  try {
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*";
    const allChars = upperCaseChars + lowerCaseChars + numbers + specialChars;

    let generatedPassword = "";
    generatedPassword +=
      upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
    generatedPassword += numbers[Math.floor(Math.random() * numbers.length)];
    generatedPassword +=
      specialChars[Math.floor(Math.random() * specialChars.length)];

    for (let i = 3; i < 15; i++) {
      generatedPassword +=
        allChars[Math.floor(Math.random() * allChars.length)];
    }

    generatedPassword = generatedPassword
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    const patientName = features.find(
      (feature) => feature.name === "PATIENT NAME"
    )?.value;
    const patientEmail = features.find(
      (feature) => feature.name === "EMAIL"
    )?.value;
    const role = "user";

    let Schema = User;
    const newUser = new Schema({ patientName, username: patientEmail, role });
    await Schema.register(newUser, generatedPassword);

    newUser.predictions.push(prediction._id);
    await newUser.save();

    const message = `
      Hi ${patientName}, your account has been created successfully.
      <br><br>
      
      Here are your credentials:<br><br>
      - Email: ${patientEmail}<br><br>
      - Role Assigned: ${role}<br><br>
      - Password: ${generatedPassword} (Please keep this password secure)<br><br>

      You can now log in and access COPD PRED.<br>
    `;
    const options = {
      from: "kum19mittal03@gmail.com",
      to: patientEmail,
      subject: "COPD PRED Account Credentials",
      text: message,
      html: HTML_TEMPLATE(message),
    };

    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });
    res.status(200).send("True");
  } catch (error) {
    console.error(error);
    res.status(400).send("User already exists or registration failed");
  }
});

app.get("/login/suc", (req, res) => {
  if (req.user) {
    res
      .status(200)
      .json({ success: true, message: "successfull", user: req.user });
  }
});

app.get("/login/fail", (req, res) => {
  res.status(400).json({ success: false, message: "failed" });
});

app.get("/api/users/:id/:role", async (req, res) => {
  const role = req.params.role;
  let Schema;
  if (role === "admin") {
    Schema = Admin;
  } else if (role === "doctor") {
    Schema = Doctor;
  } else if (role === "lab-technician") {
    Schema = LabTechnician;
  } else {
    Schema = User;
  }
  const user = await Schema.findById(req.params.id);
  res.status(200).send(user);
});

app.get("/api/doctor-labtech-data", async (req, res) => {
  const doctors = await Doctor.find();
  const labTechs = await LabTechnician.find();
  res.status(200).send({ doctors, labTechs });
});

app.get("/api/patient/reports/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("predictions");
  res.status(200).send(user.predictions);
});

app.get("/api/patient-data", async (req, res) => {
  const users = await User.find().populate("predictions");
  res.status(200).send(users);
});

app.get("/api/patient-data/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("predictions");
  res.status(200).send(user);
});

app.get("/api/prediction-data", async (req, res) => {
  const predictions = await Prediction.find();
  res.status(200).send(predictions);
});

app.get("/api/prediction-data/:id", async (req, res) => {
  const prediction = await Prediction.findById(req.params.id);
  res.status(200).send(prediction);
});
 
app.put("/api/prediction-data/:id", async (req, res) => {
  const { predictionCorrect, actualGoldGrade, actualGoldClass, comment } =
    req.body;

  const prediction = await Prediction.findById(req.params.id);
  prediction.prediction_correct = predictionCorrect;
  prediction.doctors_gold_grade = actualGoldGrade;
  prediction.doctors_gold_class = actualGoldClass;
  // if comment is not null, add it to the comments array
  if (comment) {
    prediction.Comments.push(comment);
  }
  await prediction.save();
  res.status(200).send(prediction);
});

app.get("/api/patientCount", async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).send({ count });
});

app.get("/api/admin/doctor-labtech-data/:id/:role", async (req, res) => {
  const role = req.params.role;
  const id = req.params.id;
  let Schema;
  if (role === "doctor") {
    Schema = Doctor;
  } else {
    Schema = LabTechnician;
  }
  const user = await Schema.findById(id);
  res.status(200).send(user);
});

app.put("/api/admin/doctor-labtech-data/:id/:role", async (req, res) => {
  const role = req.params.role;
  const id = req.params.id;
  let Schema;
  if (role === "doctor") {
    Schema = Doctor;
  } else {
    Schema = LabTechnician;
  }
  const user = await Schema.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).send(user);
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
