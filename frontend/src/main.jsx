import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Pred from "./Pages/Prediction Page/pred";
import Result from "./Pages/Result Page/result-updated";
import DoctorDashboard from "./Pages/DoctorDashboard/doctorDashboard";
import axios from "axios";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import PatientDashboard from "./Pages/PatientDashboard/PatientDashboard";
import PatientDetails from "./Pages/PatientDetails/PatientDetails";
import PatientPrediction from "./Pages/PatientPrediction/PatientPrediction";
import AdminDoctorLabTechDetails from "./Pages/AdminDoctorLabTechDetails/AdminDoctorLabTechDetails";

const isLoggedIn = sessionStorage.getItem("isLoggedIn");
const isAdmin = sessionStorage.getItem("isAdmin") === "true";
const logout = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post("http://localhost:3000/api/logout");

    if (data === "Success") {
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("isAdmin");

      window.location.href = "/login";
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: isLoggedIn ? <Home logout={logout} /> : <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    // element: isAdmin ? <SignUp /> : <Login />,
    element: <SignUp />,
  },
  {
    path: "/pred",
    element: <Pred logout={logout} />,
  },
  {
    path: "/result",
    element: <Result logout={logout} />,
  },
  {
    path: "/doctor/dashboard",
    element: <DoctorDashboard logout={logout} />,
  },
  {
    path: "/admin/dashboard",
    element: isAdmin ? <AdminDashboard logout={logout} /> : <Login />,
  },
  {
    path: "/patient/dashboard",
    element: isLoggedIn ? <PatientDashboard logout={logout} /> : <Login />,
  },
  {
    path: "/patient-details",
    element: <PatientDetails logout={logout} />,
  },
  {
    path: "/prediction",
    element: <PatientPrediction logout={logout} />,
  },
  {
    path: "/admin/doctor-labtech-details",
    element: <AdminDoctorLabTechDetails logout={logout} />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
