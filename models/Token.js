import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  name: { type: String, required: true }, // наприклад, “Тестовий бот”
  token: { type: String, required: true },
});

const Token = mongoose.models.Token || mongoose.model("Token", tokenSchema);

export default Token;
