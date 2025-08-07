import { useState, useEffect } from "react";
import "./navbar.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

const getUserById = async (userId, role) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/users/${userId}/${role}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Navbar = ({ isLoggedIn, logout, username, id, role }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await getUserById(id, role);
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const getUsernameInitials = (username) => {
    if (!username || typeof username !== "string") return "";

    const words = username.split("@")[0].split(".");
    if (words.length >= 2) {
      return `${words[0]} ${words[1]}`;
    } else if (words.length === 1) {
      return words[0];
    } else {
      return "";
    }
  };

  const handleContactClick = () => {
    document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="navbar">
      <div>
        <a href="/" className="logo">
          COPD PRED
        </a>
      </div>

      {/* <div className="nav-links">
        <Link
          to={{
            pathname: `/`,
            search: `?username=${username}&userId=${id}`,
          }}
        >
          Home
        </Link>
        <Link
          to={{
            pathname: `/pred`,
            search: `?username=${username}&userId=${id}`,
          }}
        >
          Get Predictions
        </Link>
        <a href="#" onClick={handleContactClick}>
          Contact
        </a>
      </div> */}

      <div className="nav-buttons">
        <div className="nav-user">
          <img
            className="pfp"
            src={userData ? userData.profilePicture : ""}
            alt="user"
          />
          {isLoggedIn ? (
            <p>
              Welcome, {userData ? getUsernameInitials(userData.username) : ""}
            </p>
          ) : (
            <p>Welcome, Guest</p>
          )}
        </div>
        {isLoggedIn ? (
          <a className="logout-button" onClick={logout}>
            Logout
          </a>
        ) : (
          <>
            <a className="login-button" href="/login">
              Login
            </a>
            <a className="login-button" href="/signup">
              Sign Up
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

// prop validation
Navbar.propTypes = {
  isLoggedIn: PropTypes.string,
  logout: PropTypes.func,
  username: PropTypes.string,
  id: PropTypes.string,
  role: PropTypes.string,
};
