import "./result.css";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Result = ({ logout }) => {
  const location = useLocation();
  const data = location.state?.data;
  const patientInfo = location.state?.patientInfo;
  const patientData = patientInfo?.data; 
  const searchParams = new URLSearchParams(location.search);
  const isLoggedIn = "true";
  const username = searchParams.get("username");
  const userId = searchParams.get("userId");

  const mapGoldClass = (classNumber) => {
    switch (classNumber) {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      case 3:
        return "D";
      default:
        return "Unknown";
    }
  };

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

  // Function to map gold grade
  const mapGoldGrade = (gradeNumber) => {
    switch (gradeNumber) {
      case 0:
        return "1 MILD";
      case 1:
        return "2 MODERATE";
      case 2:
        return "3 SEVERE";
      case 3:
        return "4 VERY SEVERE";
      default:
        return "Unknown";
    }
  };

  const renderInputField = (feature) => {
    const defaultValue =
      patientInfo?.data[feature.name.toUpperCase().replace(/[_-]/g, " ")];

    if (feature.type === "bool") {
      const isChecked = defaultValue === "TRUE" ? true : false;
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

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        logout={logout}
        username={username}
        id={userId}
      />
      <div className="result-page">
        <h1 className="result-page-heading">RESULTS</h1>

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
                        <p>{mapGoldGrade(data[0])}</p>
                        <p>{Math.max(...data[1].flat()).toFixed(2)}</p>
                      </>
                    </div>

                    <div className="pred-table-row F2F7F7-bg">
                      <p>Gold Class</p>
                      <>
                        <p>{mapGoldClass(data[2])}</p>
                        <p>{Math.max(...data[3].flat()).toFixed(2)}</p>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="comments">
              <div className="commentHeader">Comments</div>
              <form action="" className="commentForm">
                <input type="text" placeholder="Add Comment" />
                <button type="submit">Submit</button>
              </form>
            </div> */}
          </div>
          <div className="result-patient-information-head">
            <h1 className="">Patient Information</h1>
          </div>
          <div className="result-patient-information">
            {
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
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Result;

// prop validation

Result.propTypes = {
  logout: PropTypes.func,
};
