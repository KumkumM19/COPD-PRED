import "./AdminDoctorLabTechDetails.css";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminDoctorLabTechDetails = ({ logout }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const userId = searchParams.get("userId");
  const role = searchParams.get("role");
  const [userDetails, setUserDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isLoggedIn !== "true") {
      window.location.href = "/login";
    }

    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/admin/doctor-labtech-data/${userId}/${role}`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [isLoggedIn, userId, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/admin/doctor-labtech-data/${userId}/${role}`,
        userDetails
      );
      alert("User details updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        logout={logout}
        username={username}
        id={userId}
        role={role}
      />
      <div className="admin-doctor-lab-tech-details-header">
        User Details ({role})
      </div>
      <div className="user-details-form">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={userDetails.username || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Role:
            <input
              type="text"
              name="role"
              value={userDetails.role || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Created At:
            <input
              type="text"
              name="createdAt"
              value={new Date(userDetails.createdAt).toLocaleString() || ""}
              onChange={handleChange}
              disabled
            />
          </label>
          <label>
            Is Active:
            <input
              type="checkbox"
              name="isActive"
              checked={userDetails.isActive || false}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
              disabled={!isEditing}
            />
          </label>
          <label>
            Profile Picture:
            <input
              type="text"
              name="profilePicture"
              value={userDetails.profilePicture || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          {isEditing && <button type="submit">Save</button>}
        </form>
        {!isEditing && (
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
      <Footer />
    </>
  );
};

AdminDoctorLabTechDetails.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default AdminDoctorLabTechDetails;
