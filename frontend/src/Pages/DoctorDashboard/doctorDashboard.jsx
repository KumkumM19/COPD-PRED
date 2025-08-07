import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import PropTypes from "prop-types";
import "./doctorDashboard.css";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Chart = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart">
      <PieChart
        series={[
          {
            innerRadius: 40,
            outerRadius: 80,
            cornerRadius: 5,
            arcLabel: (item) => `${((item.value / total) * 100).toFixed(1)}%`,
            arcLabelRadius: 110,
            highlightScope: { fade: "global", highlight: "item" },

            data,
          },
        ]}
        width={400}
        height={200}
        slotProps={{
          legend: {
            direction: "column",
            padding: 0,
            labelStyle: {
              fontSize: 8,
            },
          },
          arcLabel: {
            labelStyle: {
              fontSize: 8,
            },
          },
        }}
      />
      {title}
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

const DoctorDashboard = ({ logout }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const userId = searchParams.get("userId");
  const role = searchParams.get("role");

  const [patientData, setPatientData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [goldGradeValues, setGoldGradeValues] = useState([]);
  const [goldClassValues, setGoldClassValues] = useState([]);
  const itemsPerPage = 5;

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

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      window.location.href = "/login";
    }

    const getPatientData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/patient-data`
        );
        console.log("Patient Data:", data);
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    const getPredictionData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/prediction-data`
        );
        const goldGradeValues = data.map((prediction) =>
          mapGoldGrade(prediction.prediction_gold_grade)
        );
        const goldClassValues = data.map((prediction) =>
          mapGoldClass(prediction.prediction_gold_class)
        );
        setGoldGradeValues(goldGradeValues);
        setGoldClassValues(goldClassValues);
      } catch (error) {
        console.error("Error fetching prediction data:", error);
      }
    };

    getPatientData();
    getPredictionData();
  }, []);

  // Array of chart data (six data arrays for six charts with green shades)
  const chartData = [
    [
      { id: 0, value: 10, label: "Series A", color: "#006965" },
      { id: 1, value: 15, label: "Series B", color: "#00796B" },
      { id: 2, value: 20, label: "Series C", color: "#00897B" },
      { id: 3, value: 20, label: "Series D", color: "#009688" },
    ],

    // gold grade
    [
      {
        id: 0,
        value: goldGradeValues.filter((grade) => grade === "1 MILD").length,
        label: "1 MILD",
        color: "#006965",
      },
      {
        id: 1,
        value: goldGradeValues.filter((grade) => grade === "2 MODERATE").length,
        label: "2 MODERATE",
        color: "#00796B",
      },
      {
        id: 2,
        value: goldGradeValues.filter((grade) => grade === "3 SEVERE").length,
        label: "3 SEVERE",
        color: "#00897B",
      },
      {
        id: 3,
        value: goldGradeValues.filter((grade) => grade === "4 VERY SEVERE")
          .length,
        label: "4 VERY SEVERE",
        color: "#009688",
      },
    ],

    // gold class

    [
      {
        id: 0,
        value: goldClassValues.filter((classValue) => classValue === "A")
          .length,
        label: "A",
        color: "#005D59",
      },
      {
        id: 1,
        value: goldClassValues.filter((classValue) => classValue === "B")
          .length,
        label: "B",
        color: "#00796B",
      },
      {
        id: 2,
        value: goldClassValues.filter((classValue) => classValue === "C")
          .length,
        label: "C",
        color: "#5FB494",
      },
      {
        id: 3,
        value: goldClassValues.filter((classValue) => classValue === "D")
          .length,
        label: "D",
        color: "#4CAF50",
      },
    ],
  ];

  const chartTitles = [
    "Prediction Accuracy",
    "Gold Grade Distribution",
    "Gold Class Distribution",
  ];

  const filteredPatients = patientData.filter((patient) => {
    const matchesSearch = Object.values(patient).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && patient.isActive) ||
      (filter === "inactive" && !patient.isActive);

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const currentPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
      <div className="overview analytics">Analytics - Patients</div>
      <div className="charts">
        <div className="chart-row-1 chart-row">
          {chartData.slice(0, 3).map((data, index) => (
            <div key={index}>
              <Chart key={index} data={data} title={chartTitles[index]} />
            </div>
          ))}
        </div>
      </div>
      <div className="doctor-dashboard">
        <div className="overview">OVERVIEW - Patients</div>
        <div className="searchAndFilter">
          <form
            className="searchForm"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent form submit
            }}
          >
            <input
              type="text"
              placeholder="🔍 Enter patient details"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </form>
          <form
            className="filterForm"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent form submit
            }}
          >
            <label htmlFor="filter">Filter by:</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)} // Update filter
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </form>
        </div>
        <div className="patients">
          <div className="dataHeaders">
            <div className="dataHeaderValue">ID</div>
            <div className="dataHeaderValue">Name</div>
            <div className="dataHeaderValue">ACC. TYPE</div>
            <div className="dataHeaderValue">PHONE NO.</div>
            <div className="dataHeaderValue">GOLD GRADE</div>
            <div className="dataHeaderValue">GOLD CLASS</div>
            <div className="dataHeaderValue">Report Date</div>
            <div className="dataHeaderValue">Is Active</div>
          </div>
          {currentPatients.map((patient) => (
            <Link
              to={`/patient-details?userId=${patient._id}&username=${username}`}
              key={patient._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="dataRow">
                <div className="dataValue">{patient._id}</div>
                <div className="dataValue">{patient.username}</div>
                <div className="dataValue">
                  {patient.role === "user" ? "Patient" : "-"}
                </div>
                <div className="dataValue">+91 8888888888</div>
                <div className="dataValue">
                  {patient.predictions && patient.predictions[0]
                    ? mapGoldGrade(patient.predictions[0].prediction_gold_grade)
                    : "Unknown"}
                </div>
                <div className="dataValue">
                  {patient.predictions && patient.predictions[0]
                    ? mapGoldClass(patient.predictions[0].prediction_gold_class)
                    : "Unknown"}
                </div>
                <div className="dataValue">
                  {patient.predictions && patient.predictions[0]
                    ? formatDate(patient.predictions[0].date)
                    : "Invalid Date"}
                </div>
                <div className="dataValue">
                  {patient.isActive ? "Yes" : "No"}
                </div>
              </div>
            </Link>
          ))}
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
      </div>
      <Footer />
    </>
  );
};

DoctorDashboard.propTypes = {
  logout: PropTypes.func,
};

export default DoctorDashboard;
