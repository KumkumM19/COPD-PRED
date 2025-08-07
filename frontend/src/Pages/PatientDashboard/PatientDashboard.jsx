import Navbar from "../../components/Navbar/navbar";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./PatientDashboard.css";

const PatientDashboard = ({ logout }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const username = searchParams.get("username");
  const userId = searchParams.get("userId");
  const role = searchParams.get("role");

  // State for patient reports and pagination
  const [patientReports, setPatientReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Set the number of records per page
  const totalPages = Math.ceil(patientReports.length / recordsPerPage);

  useEffect(() => {
    if (isLoggedIn !== "true") {
      window.location.href = "/login";
    }

    const getPatientReports = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/patient/reports/${userId}`
        );
        console.log("Patient reports:", data);
        setPatientReports(data);
      } catch (error) {
        console.error("Error fetching patient reports:", error);
      }
    };

    getPatientReports();
  }, [isLoggedIn, userId]);

  // Format date to a readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Pagination: get current data based on page
  const currentData = patientReports.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const mapGoldClass = (classNumber) => {
    switch (classNumber) {
      case "0":
        return "A";
      case "1":
        return "B";
      case "2":
        return "C";
      case "3":
        return "D";
      default:
        return "Unknown";
    }
  };

  const mapGoldGrade = (gradeNumber) => {
    switch (gradeNumber) {
      case "0":
        return "1 MILD";
      case "1":
        return "2 MODERATE";
      case "2":
        return "3 SEVERE";
      case "3":
        return "4 VERY SEVERE";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        logout={logout}
        username={username}
        id={userId}
      />
      <div className="Patient-Dashboard">
        Patient Dashboard - View your Reports
      </div>

      <div className="records">
        <div className="dataHeaders">
          <div className="dataHeaderValue">ID</div>
          <div className="dataHeaderValue">Predicted Gold Class</div>
          <div className="dataHeaderValue">Predicted Gold Grade</div>
          <div className="dataHeaderValue">Comments</div>
        </div>
        {currentData.map((record) => {
          return (
            <div className="dataRow" key={record._id}>
              <div className="dataValue">{record._id}</div>
              <div className="dataValue">
                {mapGoldClass(record.prediction_gold_class)}
              </div>

              <div className="dataValue">
                {mapGoldGrade(record.prediction_gold_grade)}
              </div>
              <div className="dataValue">
                {record.Comments && record.Comments.length > 0
                  ? record.Comments[0]
                  : "-"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <button
          className={currentPage === 1 ? "disabled" : ""}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={currentPage === totalPages ? "disabled" : ""}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

PatientDashboard.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default PatientDashboard;
