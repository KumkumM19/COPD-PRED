import "./SignUp.css";
import axios from "axios";
import { useState } from "react";
import { BarChartBig, Earth, GlobeLock, Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
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
    setPassword(generatedPassword);
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/signup", {
        name,
        email,
        password,
        role,
      });

      if (data === "True") {
        toast.success("Account created successfully! Redirecting to login...", {
          onClose: () => {
            window.location.href = "/login";
          },
        });
        setEmail("");
        setPassword("");
        setRole("");
        setName("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Account creation failed. Please try again.");
    }
  };

  // const handleGoogleLogin = async (e) => {
  //   e.preventDefault();
  //   window.location.href = "http://localhost:3000/google";
  //   sessionStorage.setItem("isLoggedIn", "true");
  // };

  return (
    <div className="SignupPage">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="left">
        <div className="signup-novelty">
          <div className="signup-novely-box">
            <div className="signup-novelty-box-left">
              <BarChartBig size={80} color="white" strokeWidth={1} />
            </div>
            <div className="signup-novelty-box-right">
              <h2>Data-Driven Insights</h2>
              <p>
                Leverage real-time data analysis to make well-informed decisions
                and improve health outcomes.
              </p>
            </div>
          </div>

          <div className="signup-novely-box">
            <div className="signup-novelty-box-left">
              <Earth size={80} color="white" strokeWidth={1} />
            </div>
            <div className="signup-novelty-box-right">
              <h2>Global Health Access</h2>
              <p>
                Access cutting-edge health technology anywhere in the world for
                comprehensive COPD management.
              </p>
            </div>
          </div>

          <div className="signup-novely-box">
            <div className="signup-novelty-box-left">
              <GlobeLock size={80} color="white" strokeWidth={1} />
            </div>
            <div className="signup-novelty-box-right">
              <h2>Secure & Confidential</h2>
              <p>
                Protect patient data with advanced security protocols, ensuring
                privacy and confidentiality.
              </p> 
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="signUp">
          <h1 className="heading">COPD PRED</h1>
          <h3 className="subHeading">
            Create an <span className="highlight">Account</span>
          </h3>
          <p className="subHeading">
            Account details will be mailed to the entered email ID
          </p>
          <form className="signupForm" onSubmit={signUp}>
            <div className="nameRoleContainer">
              <div className="name">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="role">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="doctor">Doctor</option>
                  <option value="lab-technician">Lab Technician</option>
                  <option value="user">Patient</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="passwordContainer">
              <div className="password">
                <label htmlFor="password">Password</label>
                <div className="passwordInputWrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="togglePasswordIcon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </div>
              <div className="generatePassword">
                <button type="button" onClick={generatePassword}>
                  Generate
                </button>
              </div>
            </div>
            <button className="signUpBtn" type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;