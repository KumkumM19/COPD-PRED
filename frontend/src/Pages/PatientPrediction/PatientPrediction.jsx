import "./PatientPrediction.css";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

const PatientPrediction = ({ logout }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isLoggedIn = "true";
  const userId = searchParams.get("userId");
  const predictionId = searchParams.get("predictionId");

  const [data, setData] = useState(null);
  const [predictionCorrect, setPredictionCorrect] = useState(null);
  const [actualGoldGrade, setActualGoldGrade] = useState("");
  const [actualGoldClass, setActualGoldClass] = useState("");
  const [comment, setComment] = useState("");

  const med_features = [
    { name: "PATIENT NAME", type: "string" },
    { name: "PHONE NUMBER", type: "string" },
    { name: "EMAIL", type: "string" },
    { name: "AGE", type: "number" },
    { name: "WEIGHT IN KGS", type: "number" },
    { name: "HEIGHT IN CM", type: "number" },
    { name: "BMI", type: "number" },
    { name: "SHORTNESS OF BREATH DURATION", type: "number" },
    { name: "COUGH DURATION", type: "number" },
    { name: "EXPECTORATION DURATION", type: "number" },
    { name: "CHEST PAIN DURATION", type: "number" },
    { name: "NO OF YEARS", type: "number" },
    { name: "SMOKING INDEX", type: "number" },
    { name: "TLC", type: "number" },
    { name: "PLATELET", type: "number" },
    { name: "TRBC", type: "number" },
    { name: "ESR", type: "number" },
    { name: "CRP", type: "number" },
    { name: "LDH", type: "number" },
    { name: "ALB", type: "number" },
    { name: "SGOT", type: "number" },
    { name: "SGPT", type: "number" },
    { name: "S ALP", type: "number" },
    { name: "S. UREA", type: "number" },
    { name: "6mwd (pred)", type: "number" },
    { name: "6MWD", type: "number" },
    { name: "mMRC GRADE", type: "number" },
    { name: "FEV1 PRE BD L/SEC", type: "number" },
    { name: "FEV1 PRE BD %PRED", type: "number" },
    { name: "FVC PRE BD % PRED", type: "number" },
    { name: "FEV1/FVC PRE BD L/SEC", type: "number" },
    { name: "FEV1/FVC PRE BD % PRED", type: "number" },
    { name: "FEV1 POST BD % PRED", type: "number" },
    { name: "FVC POST BD L/SEC", type: "number" },
    { name: "FVC POST BD % PRED", type: "number" },
    { name: "FEVI/FVC POST BD  L/SEC", type: "number" },
    { name: "FEVI/FVC POST BD  % PRED", type: "number" },
    { name: "NO OF EXACERBATIONS IN PREVIOUS YEAR", type: "number" },
    { name: "HB", type: "number" },
    { name: "FEV1 POST BD L/SEC", type: "number" },
    {
      name: "CIGARETTE/BIDI/GANJA/BIOMASS FUEL EXPOSURE IN PACK YEARS",
      type: "number",
    },
    { name: "BIL (T)", type: "number" },
    { name: "PROTEINS", type: "number" },
    { name: "HYPERTENSION yes", type: "bool" },
    { name: "STEROID USE yes", type: "bool" },
    { name: "TYPE OF SMOKER current smoker", type: "bool" },
    { name: "SMOKELESS TOBACCO USE no", type: "bool" },
    { name: "SEX female", type: "bool" },
    { name: "DIABETES  no", type: "bool" },
    { name: "PEDAL EDEMA yes", type: "bool" },
    { name: "CHEST PAIN yes", type: "bool" },
    { name: "TYPE OF SMOKER non smoker", type: "bool" },
    { name: "EXPECTORATION no", type: "bool" },
    { name: "TYPE OF SMOKER ex smoker", type: "bool" },
    { name: "HYPERTENSION no", type: "bool" },
    { name: "SMOKELESS TOBACCO USE yes", type: "bool" },
  ];

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
    if (isLoggedIn !== "true") {
      window.location.href = "/login";
    }

    const getPatientData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/prediction-data/${predictionId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    getPatientData();
  }, [predictionId, isLoggedIn]);

  const renderInputField = (feature) => {
    const featureData = data?.features.find((f) => f.name === feature.name);

    if (!featureData) return null;

    const defaultValue = featureData.value;

    if (feature.type === "bool") {
      const isChecked = defaultValue === "TRUE" || defaultValue === true;
      return (
        <input
          type="checkbox"
          className="symptoms-inputs check-box"
          name={feature.name.toLowerCase().replace(/\s/g, "-")}
          id={feature.name.toLowerCase().replace(/\s/g, "-")}
          checked={isChecked}
          readOnly
        />
      );
    } else {
      return (
        <input
          type={feature.type}
          className="symptoms-inputs"
          name={feature.name.toLowerCase().replace(/\s/g, "-")}
          id={feature.name.toLowerCase().replace(/\s/g, "-")}
          value={defaultValue}
          readOnly
        />
      );
    }
  };

  const handlePredictionCheck = (value) => {
    setPredictionCorrect(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/prediction-data/${predictionId}`, {
      predictionCorrect,
      actualGoldGrade,
      actualGoldClass,
      comment,
    });

    alert("Data submitted successfully!");
    // empty the form
    setPredictionCorrect(null);
    setActualGoldGrade("");
    setActualGoldClass("");
    setComment("");
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        logout={logout}
        username={searchParams.get("username")}
        id={userId}
      />
      <div className="result-page">
        <h1 className="result-page-heading">PATIENT PREDICTION</h1>

        <div className="result-bg-box">
          <div className="header">
            <div className="result-result-box">
              <div className="result-top-left-box">
                <h1>TEST</h1>
                <h1>COPD SEVERITY</h1>
              </div>
              <div className="result-content-box">
                <div className="pred-table">
                  <div className="pred-table-head-row">
                    <h2>Reference</h2>
                    <h2>Prediction</h2>
                    <h2>Probability</h2>
                  </div>

                  <div className="pred-table-row-box">
                    <div className="pred-table-row">
                      <p>Gold Grade</p>
                      <>
                        {data ? (
                          <>
                            <p>{mapGoldGrade(data.prediction_gold_grade)}</p>
                            <p>
                              {Math.max(
                                ...data.probability_gold_grade[0]
                                  .split(",")
                                  .map(Number)
                              ).toFixed(2)}
                            </p>
                          </>
                        ) : (
                          <p>Loading...</p>
                        )}
                      </>
                    </div>

                    <div className="pred-table-row F2F7F7-bg">
                      <p>Gold Class</p>
                      <>
                        {data ? (
                          <>
                            <p>{mapGoldClass(data.prediction_gold_class)}</p>
                            <p>
                              {Math.max(
                                ...data.probability_gold_class[0]
                                  .split(",")
                                  .map(Number)
                              ).toFixed(2)}
                            </p>
                          </>
                        ) : (
                          <p>Loading...</p>
                        )}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="predCheck">
              <div className="predCheckHeader">Is the Prediction Correct?</div>
              <form onSubmit={handleSubmit} className="commentForm">
                <input
                  type="radio"
                  id="yes"
                  name="prediction"
                  value="yes"
                  onChange={() => handlePredictionCheck(true)}
                />
                <label htmlFor="yes">Yes</label>
                <input
                  type="radio"
                  id="no"
                  name="prediction"
                  value="no"
                  onChange={() => handlePredictionCheck(false)}
                />
                <label htmlFor="no">No</label>
                {predictionCorrect === false && (
                  <>
                    <input
                      type="text"
                      placeholder="Actual Gold Grade"
                      value={actualGoldGrade}
                      onChange={(e) => setActualGoldGrade(e.target.value)}
                      className="result-patient-info-inputs"
                    />
                    <input
                      type="text"
                      placeholder="Actual Gold Class"
                      value={actualGoldClass}
                      onChange={(e) => setActualGoldClass(e.target.value)}
                      className="result-patient-info-inputs"
                    />
                  </>
                )}
                <button type="submit">Submit</button>
              </form>
            </div>

            <div className="comments">
              <div className="commentHeader">Comments</div>
              <form className="commentForm" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Add Comment (optional)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="result-patient-information-head">
            <h1>Patient Information</h1>
          </div>
          <div className="result-patient-information">
            <form className="symptoms-form">
              <div className="symptoms-box-1">
                {med_features.map((feature, index) => (
                  <div key={index} className="symptoms-row-box">
                    <div className="symptom-input-box">
                      <label
                        className="symptoms-input-heading"
                        htmlFor={feature.name.toLowerCase().replace(/\s/g, "-")}
                      >
                        {feature.name}
                      </label>
                      {renderInputField(feature)}
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

PatientPrediction.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default PatientPrediction;
