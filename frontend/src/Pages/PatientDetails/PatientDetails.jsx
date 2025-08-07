import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import PropTypes from "prop-types";
import "./PatientDetails.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const PatientDetails = ({ logout }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const username = searchParams.get("username");

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (isLoggedIn !== "true") {
      window.location.href = "/login";
    }

    const getPatientData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/patient-data/${userId}`
        );
        console.log("Patient Data:", data);
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setError("Failed to fetch patient data.");
      } finally {
        setLoading(false);
      }
    };

    getPatientData();
  }, [userId, isLoggedIn]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!patientData) return <div>No patient data available.</div>;

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} logout={logout} username={username} />
      <div className="pastPredictions">
        Past Predictions - {patientData.username} (
        {patientData.predictions.length})
      </div>
      <div className="patients">
        <div className="dataHeaders">
          <div className="dataHeaderValue">ID</div>
          <div className="dataHeaderValue">GOLD GRADE</div>
          <div className="dataHeaderValue">GOLD CLASS</div>
          <div className="dataHeaderValue">Report Date</div>
        </div>
        {patientData.predictions
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
          .map((prediction) => (
            <Link
              to={`/prediction?predictionId=${prediction._id}`}
              className="dataRow"
              key={prediction._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="dataValue">{prediction._id}</div>
              <div className="dataValue">
                {mapGoldGrade(prediction.prediction_gold_grade) || "Unknown"}
              </div>
              <div className="dataValue">
                {mapGoldClass(prediction.prediction_gold_class) || "Unknown"}
              </div>
              <div className="dataValue">
                {formatDate(prediction.date) || "Invalid Date"}
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </>
  );
};

PatientDetails.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default PatientDetails;
