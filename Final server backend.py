import pickle
import numpy as np

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model
model_gold_grade = pickle.load(open("./xgb_model_hp.pkl", "rb"))
model_gold_class = pickle.load(open("./xgb_model_gold_class_hp.pkl", "rb"))


column_names_gold_grade = [
    "AGE",
    "WEIGHT IN KGS",
    "HEIGHT IN CM",
    "BMI",
    "SHORTNESS OF BREATH DURATION",
    "COUGH DURATION",
    "EXPECTORATION DURATION",
    "CHEST PAIN DURATION",
    "NO OF YEARS",
    "SMOKING INDEX",
    "TLC ",
    "PLATELET",
    "TRBC",
    "ESR",
    "CRP",
    "LDH",
    "ALB",
    "SGOT",
    "SGPT",
    "S ALP",
    "S. UREA",
    "6mwd (pred)",
    "6MWD",
    "mMRC GRADE",
    "FEV1 PRE BD L/SEC",
    "FEV1 PRE BD %PRED",
    "FVC PRE BD % PRED",
    "FEV1/FVC PRE BD L/SEC",
    "FEV1/FVC PRE BD % PRED",
    "FEV1 POST BD % PRED",
    "FVC POST BD L/SEC",
    "FVC POST BD % PRED",
    "FEVI/FVC POST BD  L/SEC",
    "FEVI/FVC POST BD  % PRED",
    "HYPERTENSION yes",
    "STEROID USE yes",
    "TYPE OF SMOKER current smoker",
    "SMOKELESS TOBACCO USE no",
]
column_names_gold_class = [
    "AGE",
    "WEIGHT IN KGS",
    "HEIGHT IN CM",
    "SHORTNESS OF BREATH DURATION",
    "COUGH DURATION",
    "EXPECTORATION DURATION",
    "CHEST PAIN DURATION",
    "CIGARETTE/BIDI/GANJA/BIOMASS FUEL EXPOSURE IN PACK YEARS",
    "NO OF YEARS",
    "SMOKING INDEX",
    "HB",
    "TLC ",
    "PLATELET",
    "TRBC",
    "ESR",
    "CRP",
    "LDH",
    "BIL (T)",
    "PROTEINS",
    "ALB",
    "SGOT",
    "SGPT",
    "S ALP",
    "S. UREA",
    "6mwd (pred)",
    "6MWD",
    "mMRC GRADE",
    "NO OF EXACERBATIONS IN PREVIOUS YEAR",
    "FEV1 PRE BD %PRED",
    "FVC PRE BD % PRED",
    "FEV1/FVC PRE BD L/SEC",
    "FEV1/FVC PRE BD % PRED",
    "FEV1 POST BD L/SEC",
    "FEV1 POST BD % PRED",
    "FVC POST BD L/SEC",
    "FVC POST BD % PRED",
    "FEVI/FVC POST BD  L/SEC",
    "FEVI/FVC POST BD  % PRED",
    "SEX female",
    "EXPECTORATION no",
    "CHEST PAIN yes",
    "DIABETES  no",
    "HYPERTENSION no",
    "HYPERTENSION yes",
    "PEDAL EDEMA yes",
    "TYPE OF SMOKER ex smoker",
    "TYPE OF SMOKER non smoker",
    "SMOKELESS TOBACCO USE no",
    "SMOKELESS TOBACCO USE yes",
]

pred_gold_class, prob_gold_class, prediction, probability = None, None, None, None


@app.route("/predict", methods=["POST"])
@app.route("/predict", methods=["POST"])
def predict():
    pred_gold_class, probability_gold_class = predict_gold_class()

    data = request.json
    data_filtered = {col: data.get(col, None)
                     for col in column_names_gold_grade}

    # Convert values to appropriate data types
    for col, value in data_filtered.items():
        if isinstance(value, str) and value.lower() == "true":
            data_filtered[col] = True
        elif isinstance(value, str) and value.lower() == "false":
            data_filtered[col] = False

    # Convert dictionary to array
    data_array = np.array(list(data_filtered.values())).reshape(1, -1)

    # Make prediction
    prediction = int(model_gold_grade.predict(data_array)[0])
    probability = model_gold_grade.predict_proba(data_array).tolist()

    return jsonify(
        prediction=prediction,
        probability=probability,
        prediction_gold_class=pred_gold_class,
        probability_gold_class=probability_gold_class,
    )


def predict_gold_class():
    data = request.json
    data_filtered = {col: data.get(col, None)
                     for col in column_names_gold_class}

    # Convert values to appropriate data types
    for col, value in data_filtered.items():
        if isinstance(value, str) and value.lower() == "true":
            data_filtered[col] = True
        elif isinstance(value, str) and value.lower() == "false":
            data_filtered[col] = False

    # Convert dictionary to array
    data_array = np.array(list(data_filtered.values())).reshape(1, -1)

    # Make prediction
    prediction = int(model_gold_class.predict(data_array)[0])
    probability = model_gold_class.predict_proba(data_array).tolist()

    return prediction, probability


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
