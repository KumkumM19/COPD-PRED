import "./AdminDashboard.css";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";

// Function to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Function to capitalize the first letter of each word in the name
const formatName = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

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

const AdminDashboard = ({ logout }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const userId = searchParams.get("userId");
  const role = searchParams.get("role");

  const [doctorLabTechData, setDoctorLabTechData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfDoctors, setNumberOfDoctors] = useState(0);
  const [numberOfLabTechs, setNumberOfLabTechs] = useState(0);
  const [noOfActiveAccounts, setNoOfActiveAccounts] = useState(0);
  const [noOfInactiveAccounts, setNoOfInactiveAccounts] = useState(0);
  const [noOfPatients, setNoOfPatients] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    if (isLoggedIn !== "true") {
      window.location.href = "/login";
    }

    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/doctor-labtech-data"
        );
        const combinedData = [
          ...response.data.doctors,
          ...response.data.labTechs,
        ];

        setNumberOfDoctors(response.data.doctors.length);
        setNumberOfLabTechs(response.data.labTechs.length);
        setNoOfActiveAccounts(
          combinedData.filter((record) => record.isActive).length
        );
        setNoOfInactiveAccounts(
          combinedData.filter((record) => !record.isActive).length
        );
        setDoctorLabTechData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function fetchPatientCount() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/patientCount"
        );
        setNoOfPatients(response.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    fetchPatientCount();
  }, [isLoggedIn, setDoctorLabTechData, setSearchTerm, setFilter]);
  const chartData = [
    [
      { id: 0, value: numberOfDoctors, label: "Doctors", color: "#005D59" },
      {
        id: 1,
        value: numberOfLabTechs,
        label: "Lab Technicians",
        color: "#00796B",
      },
    ],
    [
      { id: 0, value: noOfActiveAccounts, label: "Active", color: "#004C47" },
      {
        id: 1,
        value: noOfInactiveAccounts,
        label: "Inactive",
        color: "#008376",
      },
    ],
  ];

  const chartTitles = [
    "Number of Doctors & Lab Technicians",
    "Active vs Inactive Accounts",
  ];

  const filteredData = doctorLabTechData.filter((record) => {
    const matchesSearch = Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && record.isActive) ||
      (filter === "inactive" && !record.isActive);

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        logout={logout}
        username={username}
        id={userId}
        role={role}
      />
      <div className="overview analytics">
        Analytics - Doctors & Lab Technicians
      </div>
      <div className="createAccAndchartContainer">
        <div className="createAccount">
          <a href="/signup" className="createNewDoctorAccount">
            + Create New Doctor Account
          </a>
          <a href="/signup" className="createNewLabTechAccount">
            + Create New Lab Technician Account
          </a>
          <div className="totalPatients">
            <span>Total Patients</span>
            <span>{noOfPatients}</span>
          </div>
        </div>
        <div className="charts">
          <div className="chart-row-1 chart-row">
            {chartData.slice(0, 3).map((data, index) => (
              <Chart key={index} data={data} title={chartTitles[index]} />
            ))}
          </div>
        </div>
      </div>
      <div className="doctor-dashboard">
        <div className="overview">OVERVIEW - Doctors & Lab Technicians</div>
        <div className="searchAndFilter">
          <form
            className="searchForm"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="🔍 Enter details"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <form
            className="filterForm"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="filter">Filter by:</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </form>
        </div>
        <div className="records">
          <div className="dataHeaders">
            <div className="dataHeaderValue">ID</div>
            <div className="dataHeaderValue">Name</div>
            <div className="dataHeaderValue">Role</div>
            <div className="dataHeaderValue">Email</div>
            <div className="dataHeaderValue">Acc. Created on</div>
            <div className="dataHeaderValue">Is Active</div>
          </div>
          {currentData.map((record) => {
            const name = formatName(
              record.username.split("@")[0].replace(".", " ")
            );
            return (
              <Link
                to={`/admin/doctor-labtech-details?userId=${record._id}&role=${record.role}`}
                key={record._id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="dataRow" key={record._id}>
                  <div className="dataValue">{record._id}</div>
                  <div className="dataValue">{name}</div>
                  <div className="dataValue">
                    {record.role.charAt(0).toUpperCase() + record.role.slice(1)}
                  </div>
                  <div className="dataValue">{record.username}</div>
                  <div className="dataValue">
                    {formatDate(record.createdAt)}
                  </div>
                  <div className="dataValue">
                    {record.isActive ? "Yes" : "No"}
                  </div>
                </div>
              </Link>
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
      </div>
      <Footer />
    </>
  );
};

AdminDashboard.propTypes = {
  logout: PropTypes.func,
};

export default AdminDashboard;
