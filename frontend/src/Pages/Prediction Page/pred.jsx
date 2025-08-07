import { useState, useEffect } from "react";
import "./prediction.css";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

// const med_features = [
//   "AGE",
//   "WEIGHT IN KGS",
//   "HEIGHT IN CM",
//   "BMI",
//   "SHORTNESS OF BREATH DURATION",
//   "COUGH DURATION",
//   "EXPECTORATION DURATION",
//   "CHEST PAIN DURATION",
//   "NO OF YEARS",
//   "SMOKING INDEX",
//   "TLC ",
//   "PLATELET",
//   "TRBC",
//   "ESR",
//   "CRP",
//   "LDH",
//   "ALB",
//   "SGOT",
//   "SGPT",
//   "S ALP",
//   "S. UREA",
//   "6mwd (pred)",
//   "6MWD",
//   "mMRC GRADE",
//   "FEV1 PRE BD L/SEC",
//   "FEV1 PRE BD %PRED",
//   "FVC PRE BD % PRED",
//   "FEV1/FVC PRE BD L/SEC",
//   "FEV1/FVC PRE BD % PRED",
//   "FEV1 POST BD % PRED",
//   "FVC POST BD L/SEC",
//   "FVC POST BD % PRED",
//   "FEVI/FVC POST BD  L/SEC",
//   "FEVI/FVC POST BD  % PRED",
//   "HYPERTENSION yes",
//   "STEROID USE yes",
//   "TYPE OF SMOKER current smoker",
//   "SMOKELESS TOBACCO USE no",
//   "HB",
//   "SEX female",
//   "DIABETES  no",
//   "PEDAL EDEMA yes",
//   "CHEST PAIN yes",
//   "TYPE OF SMOKER non smoker",
//   "FEV1 POST BD L/SEC",
//   "EXPECTORATION no",
//   "BIL (T)",
//   "NO OF EXACERBATIONS IN PREVIOUS YEAR",
//   "TYPE OF SMOKER ex smoker",
//   "HYPERTENSION no",
//   "SMOKELESS TOBACCO USE yes",
//   "CIGARETTE/BIDI/GANJA/BIOMASS FUEL EXPOSURE IN PACK YEARS",
//   "PROTEINS",
// ];

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
  // { name: "SMOKELESS TOBACCO USE yes", type: "bool" },
];

const default_data = {
  "PATIENT NAME": "John Doe",
  "PHONE NUMBER": "1234567890",
  AGE: 40.0,
  "WEIGHT IN KGS": 47.0,
  "HEIGHT IN CM": 165.0,
  BMI: 17.3,
  "SHORTNESS OF BREATH DURATION": 2.0,
  "COUGH DURATION": 2.0,
  "EXPECTORATION DURATION": 2.0,
  "CHEST PAIN DURATION": 0.0,
  "NO OF YEARS": 1,
  "SMOKING INDEX": 500.0,
  "TLC ": 8900.0,
  PLATELET: 2.08,
  TRBC: 4.69,
  ESR: 13.0,
  CRP: 9.8,
  LDH: 234.0,
  ALB: 5.17,
  SGOT: 22.0,
  SGPT: 37.0,
  "S ALP": 104.0,
  "S. UREA": 31.0,
  "6mwd (pred)": 652.0,
  "6MWD": 280.0,
  "mMRC GRADE": 3,
  "FEV1 PRE BD L/SEC": 1.6,
  "FEV1 PRE BD %PRED": 46.0,
  "FVC PRE BD % PRED": 62.0,
  "FEV1/FVC PRE BD L/SEC": 62.5,
  "FEV1/FVC PRE BD % PRED": 78.0,
  "FEV1 POST BD % PRED": 48.0,
  "FVC POST BD L/SEC": 2.64,
  "FVC POST BD % PRED": 64.0,
  "FEVI/FVC POST BD  L/SEC": 63.3,
  "FEVI/FVC POST BD  % PRED": 79.0,
  "HYPERTENSION yes": "False",
  "STEROID USE yes": "FALSE",
  "TYPE OF SMOKER current smoker": "FALSE",
  "SMOKELESS TOBACCO USE no": "FALSE",
  "NO OF EXACERBATIONS IN PREVIOUS YEAR": 0.0,
  "BIL (T)": 0.4,
  "CHEST PAIN yes": "FALSE",
  "DIABETES  no": "FALSE",
  PROTEINS: 7.2,
  "EXPECTORATION no": "FALSE",
  "FEV1 POST BD L/SEC": 1.67,
  "PEDAL EDEMA yes": "FALSE",
  "CIGARETTE/BIDI/GANJA/BIOMASS FUEL EXPOSURE IN PACK YEARS": 0,
  HB: 15.4,
  "TYPE OF SMOKER ex smoker": "TRUE",
  "SEX female": "FALSE",
  "TYPE OF SMOKER non smoker": "FALSE",
  "HYPERTENSION no": "TRUE",
  "SMOKELESS TOBACCO USE yes": "TRUE",
  "GOLD GRADE": "3 severe",
  "GOLD CLASS": "a",
};

const Pred = ({ logout }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const userId = searchParams.get("userId");
  const role = searchParams.get("role");

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      window.location.href = "/login";
    }
  }, []);
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    ...default_data,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const formattedName = name.toUpperCase().replace(/[_-]/g, " ");
    let formattedValue = value;

    if (type === "checkbox") {
      formattedValue = e.target.checked ? "TRUE" : "FALSE";
    }

    setFormData((prevData) => ({
      ...prevData,
      [formattedName]: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/predict",
        formData
      );

      const dataArray = [
        response.data.prediction,
        response.data.probability,
        response.data.prediction_gold_class,
        response.data.probability_gold_class,
      ];

      await axios.post("http://localhost:3000/api/pred", {
        data: formData,
        prediction: response.data.prediction,
        probability: response.data.probability,
        prediction_gold_class: response.data.prediction_gold_class,
        probability_gold_class: response.data.probability_gold_class,
      });

      const url = `/result?username=${username}&userId=${userId}`;

      navigate(url, {
        state: {
          data: dataArray,
          patientInfo: {
            data: formData,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderInputField = (feature) => {
    const defaultValue =
      formData[feature.name.toUpperCase().replace(/[_-]/g, " ")];

    if (feature.type === "bool") {
      const isChecked = defaultValue === "TRUE" ? true : false;

      return (
        <input
          type="checkbox"
          className="symptoms-inputs check-box"
          name={feature.name.toLowerCase().replace(/\s/g, "-")}
          id={feature.name.toLowerCase().replace(/\s/g, "-")}
          onChange={handleChange}
          checked={isChecked}
        />
      );
    } else {
      return (
        <input
          type={feature.type}
          className="symptoms-inputs"
          placeholder={feature.name}
          name={feature.name.toLowerCase().replace(/\s/g, "-")}
          id={feature.name.toLowerCase().replace(/\s/g, "-")}
          onChange={handleChange}
          value={defaultValue}
          // required
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
        role={role}
      />
      <div className="PredictionPage">
        <div className="pred-header-box">
          <div className="pred-header-content-box">
            <h2 className="symptoms-heading">
              Define all the <span className="blue-highlight">symptoms</span>{" "}
            </h2>
            <p className="symptoms-subtext">
              Our platform guarantees a private and secure space for virtual
              sessions, cultivating a feeling of comfort and trust. climbing on
              your journey to emotional well-being instantly.
            </p>
          </div>
          <div className="pred-header-image-box">
            <img
              src="https://static.vecteezy.com/system/resources/previews/014/849/575/non_2x/doctor-studying-medicine-using-vr-vector.jpg"
              alt=""
            />
          </div>
        </div>
        <form className="symptoms-form" onSubmit={handleSubmit}>
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
          <div className="pred-button-box">
            <button className="predict-copd" type="submit">
              Predict
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Pred;

Pred.propTypes = {
  logout: PropTypes.func,
};
