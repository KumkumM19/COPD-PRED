import "./Login.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BarChartBig, Earth, GlobeLock } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      window.location.href = "/";
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
        role,
      });

      if (data.message === "Success") {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("isAdmin", data.isAdmin);

        toast.success("Login successful! Redirecting...", {
          onClose: () => {
            window.location.href = data.redirectUrl;
          },
        });
      } else {
        toast.error("Login failed. Please check your credentials.");
      }

      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="Login-Page">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="left">
        <div className="login-novelty">
          <div className="login-novely-box">
            <div className="login-novelty-box-left">
              <BarChartBig size={80} color="white" strokeWidth={1} />
            </div>
            <div className="login-novelty-box-right">
              <h2>Data-Driven Insights</h2>
              <p>
                Leverage real-time data analysis to make well-informed decisions
                and improve health outcomes.
              </p>
            </div>
          </div>

          <div className="login-novely-box">
            <div className="login-novelty-box-left">
              <Earth size={80} color="white" strokeWidth={1} />
            </div>
            <div className="login-novelty-box-right">
              <h2>Global Health Access</h2>
              <p>
                Access cutting-edge health technology anywhere in the world for
                comprehensive COPD management.
              </p>
            </div>
          </div>

          <div className="login-novely-box">
            <div className="login-novelty-box-left">
              <GlobeLock size={80} color="white" strokeWidth={1} />
            </div>
            <div className="login-novelty-box-right">
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
        <div className="login">
          <h1 className="heading">COPD PRED</h1>
          <h3 className="sub-heading">
            Sign in as a{" "}
            <span className="highlight">
              {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Patient"}
            </span>
          </h3>
          <form className="login-form" onSubmit={login}>
            <label htmlFor="username">Email Id</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
            <div className="forgotPassword">
              <a href="#">Forgot Password?</a>
            </div>
            <button className="signInBtn">Sign In</button>

            <div className="ask-signup">
              <p>
                Don&apos;t have an account?{" "}
                <a className="highlight">Contact the Admin</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
