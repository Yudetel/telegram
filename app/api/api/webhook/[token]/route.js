import { NextResponse } from "next/server";
import Rule from "@/models/Rule";
import { connectDB } from "@/lib/mongoose";

const TELEGRAM_API = "https://api.telegram.org/bot";

export async function POST(req, { params }) {
  const token = params.token;
  const body = await req.json();

  const chatId = body.message?.chat?.id;
  const text = body.message?.text;

  if (!chatId || !text) return NextResponse.json({ ok: true });

  await connectDB();

  const rule = await Rule.findOne({ trigger: text });

  if (rule) {
    await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: rule.response,
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
