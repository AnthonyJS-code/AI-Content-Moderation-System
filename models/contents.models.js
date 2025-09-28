const mongoose = require("mongoose");

const contentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      unique: true,
    },
    AIResultsDetails: {
      type: Object,
    },
    myDecision: {},
  },
  {
    timestamps: true,
  }
);

const contents = mongoose.model("content", contentSchema);
module.exports = contents;
