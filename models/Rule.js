import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema({
  trigger: { type: String, required: true },
  response: { type: String, required: true },
});

const Rule = mongoose.models.Rule || mongoose.model("Rule", ruleSchema);

export default Rule;
