import { NextResponse } from "next/server";
import Rule from "@/models/Rule";
import { connectDB } from "@/lib/mongoose";

// GET all rules
export async function GET() {
  await connectDB();
  const rules = await Rule.find();
  return NextResponse.json(rules);
}

// POST new rule
export async function POST(req) {
  await connectDB();
  const { trigger, response } = await req.json();
  const rule = await Rule.create({ trigger, response });
  return NextResponse.json(rule);
}
