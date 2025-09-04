import Rule from "@/models/Rule";
import TokenModel from "@/models/Token";
import { connectDB } from "@/lib/mongoose";

const TELEGRAM_API = "https://api.telegram.org/bot";

export async function POST(req, { params }) {
  await connectDB();

  const tokenEntry = await TokenModel.findOne({ token: params.token });
  if (!tokenEntry)
    return new Response(
      JSON.stringify({ ok: false, error: "Token not found" }),
      { status: 404 }
    );

  const body = await req.json();
  const chatId = body.message?.chat?.id;
  const text = body.message?.text;
  if (!chatId || !text)
    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  const rule = await Rule.findOne({ trigger: text });
  if (rule) {
    await fetch(`${TELEGRAM_API}${tokenEntry.token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: rule.response }),
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
