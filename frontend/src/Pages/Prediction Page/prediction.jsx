import "./prediction.css";

const Prediction = () => {
  return (
    <div className="PredictionPage">
      <h2 className="symptoms-heading">Symptoms</h2>

      <form className="symptoms-form">
        <div className="symptoms-box-1">
          <div className="symptoms-row-box">
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="weight">
                WEIGHT (IN KGS)
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="Weight"
                name="weight"
                id="weight"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="bmi">
                BMI
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="BMI"
                name="bmi"
                id="bmi"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="height">
                HEIGHT (IN CM)
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="HEIGHT"
                name="height"
                id="height"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="age">
                AGE
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="AGE"
                name="age"
                id="age"
              />
            </div>

            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="shortness of breath"
              >
                SHORTNESS OF BREATH DURATION
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="SHORTNESS OF BREATH"
                name="shortness of breath"
                id="shortness of breath"
              />
            </div>
          </div>

          <div className="symptoms-row-box">
            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="cough duration"
              >
                COUGH DURATION
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="COUGH DURATION"
                name="cough duration"
                id="cough duration"
              />
            </div>
            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="expectoration duration"
              >
                EXPECTORATION DURATION
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="EXPECTORATION DURATION"
                name="expectoration duration"
                id="expectoration duration"
              />
            </div>
            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="chest pain duration"
              >
                CHEST PAIN DURATION
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="CHEST PAIN DURATION"
                name="chest pain duration"
                id="chest pain duration"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="no of years">
                NO OF YEARS
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="NO OF YEARS"
                name="no of years"
                id="no of years"
              />
            </div>

            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="smoking index">
                SMOKING INDEX
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="SMOKING INDEX"
                name="smoking index"
                id="smoking index"
              />
            </div>
          </div>

          <div className="symptoms-row-box">
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="hb">
                HB
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="HB"
                name="hb"
                id="hb"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="tlc">
                TLC
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="TLC"
                name="tlc"
                id="tlc"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="trbc">
                TRBC
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="TRBC"
                name="trbc"
                id="trbc"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="esr">
                ESR
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="ESR"
                name="esr"
                id="esr"
              />
            </div>

            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="crp">
                CRP
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="CRP"
                name="crp"
                id="crp"
              />
            </div>
          </div>

          <div className="symptoms-row-box">
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="ldh">
                LDH
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="LDH"
                name="ldh"
                id="ldh"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="alb">
                ALB
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="ALB"
                name="alb"
                id="alb"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="sgot">
                SGOT
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="SGOT"
                name="sgot"
                id="sgot"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="sgpt">
                SGPT
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="SGPT"
                name="sgpt"
                id="sgpt"
              />
            </div>

            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="s alp">
                S ALP
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="S ALP"
                name="s alp"
                id="s alp"
              />
            </div>
          </div>

          <div className="symptoms-row-box">
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="s urea">
                S. UREA
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="S. UREA"
                name="s urea"
                id="s urea"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="6mwd">
                6MWD (PRED)
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="6mwd"
                name="6mwd"
                id="6mwd"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="6mwd">
                6MWD
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="6MWD"
                name="6mwd"
                id="6mwd"
              />
            </div>
            <div className="symptom-input-box">
              <label className="symptoms-input-heading" htmlFor="mMRC GRADE">
                mMRC GRADE
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="mMRC GRADE"
                name="mMRC GRADE"
                id="mMRC GRADE"
              />
            </div>

            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="FEV1 PRE BD l/sec"
              >
                FEV1 PRE BD_L/SEC
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder=" FEV1 PRE BD"
                name="FEV1 PRE BD l/sec"
                id="FEV1 PRE BD l/sec"
              />
            </div>
          </div>

          <div className="symptoms-row-box">
            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="FEV1 PRE BD %PRED"
              >
                FEV1 PRE BD_% PRED
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="FEV1 PRE BD %PRED"
                name="FEV1 PRE BD %PRED"
                id="FEV1 PRE BD %PRED"
              />
            </div>
            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="FVC PRE BD_% PRED"
              >
                FVC PRE BD_% PRED
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="FVC PRE BD_% PRED"
                name="FVC PRE BD_% PRED"
                id="FVC PRE BD_% PRED"
              />
            </div>
            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="FEV1/FVC PRE BD_L/SEC"
              >
                FEV1/FVC PRE BD_L/SEC
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="FEV1/FVC PRE BD_L/SEC"
                name="FEV1/FVC PRE BD_L/SEC"
                id="FEV1/FVC PRE BD_L/SEC"
              />
            </div>
            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="FEV1/FVC PRE BD_% PRED"
              >
                FEV1/FVC PRE BD_% PRED
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="FEV1/FVC PRE BD_% PRED"
                name="FEV1/FVC PRE BD_% PRED"
                id="FEV1/FVC PRE BD_% PRED"
              />
            </div>

            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="FEV1 POST BD_% PRED"
              >
                FEV1 POST BD_% PRED
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="FEV1 POST BD_% PRED"
                name="FEV1 POST BD_% PRED"
                id="FEV1 POST BD_% PRED"
              />
            </div>
          </div>

          <div className="symptoms-row-box">
            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="FVC POST BD_L/SEC"
              >
                FVC POST BD_L/SEC
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder="FVC POST BD_L/SEC"
                name="FVC POST BD_L/SEC"
                id="FVC POST BD_L/SEC"
              />
            </div>
            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="FVC POST BD_% PRED"
              >
                FVC POST BD_% PRED
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="FVC POST BD_% PRED"
                name="FVC POST BD_% PRED"
                id="FVC POST BD_% PRED"
              />
            </div>
            <div className="symptom-input-box">
              <label
                className="symptoms-input-heading"
                htmlFor="FEVI/FVC POST BD _L/SEC"
              >
                FEVI/FVC POST BD _L/SEC
              </label>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="FEVI/FVC POST BD _L/SEC"
                name="FEVI/FVC POST BD _L/SEC"
                id="FEVI/FVC POST BD _L/SEC"
              />
            </div>
            <div className="symptom-input-box">

              <label className="symptoms-inputs" htmlFor="FEVI/FVC POST BD _% PRED">
                FEVI/FVC POST BD _% PRED
              </label>

              <input
                type=""
                className="symptoms-inputs"
                placeholder=" FEVI/FVC POST BD"
              />
            </div>

            <div className="symptom-input-box">
              <p className="symptoms-input-heading">HYPERTENSION_no</p>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="HYPERTENSION No"
              />
            </div>
          </div>

          <div className="symptoms-row-box">
            <div className="symptom-input-box">
              <p className="symptoms-input-heading"> HYPERTENSION_yes</p>
              <input
                type=""
                className="symptoms-inputs"
                placeholder="HYPERTENSION Yes"
              />
            </div>
          </div>
        </div>

        <div className="pred-button-box">
          <button className="predict-copd">Predict</button>
        </div>
      </form>
    </div>
  );
};

export default Prediction;
