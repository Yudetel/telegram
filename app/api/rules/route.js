import Rule from "@/models/Rule";
import { connectDB } from "@/lib/mongoose";

// GET all rules
export async function GET() {
  await connectDB();
  const rules = await Rule.find();
  return new Response(JSON.stringify(rules));
}

// POST new rule
export async function POST(req) {
  await connectDB();
  const { trigger, response } = await req.json();
  const rule = await Rule.create({ trigger, response });
  return new Response(JSON.stringify(rule));
}
