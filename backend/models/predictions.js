const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PredictionSchema = new Schema({
  features: [
    {
      name: String,
      value: String,
    },
  ],
  prediction_gold_class: String,
  probability_gold_class: [String],
  prediction_gold_grade: String,
  probability_gold_grade: [String],
  prediction_correct: Boolean,
  doctors_gold_grade: String,
  doctors_gold_class: String,

  date: {
    type: Date,
    default: Date.now,
  },

  Comments: {
    type: [String],
  },
});

module.exports = mongoose.model("Prediction", PredictionSchema);
