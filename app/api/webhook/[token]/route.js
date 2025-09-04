import Token from "@/models/Token";
import { connectDB } from "@/lib/mongoose";

export async function POST(req) {
  await connectDB();
  const { name, token } = await req.json();

  if (!name || !token)
    return new Response(
      JSON.stringify({ ok: false, error: "Missing fields" }),
      { status: 400 }
    );

  const newToken = await Token.create({ name, token });

  // Встановлення webhook (як ми робили раніше)
  try {
    const TELEGRAM_API = "https://api.telegram.org/bot";
    const domain = process.env.NEXT_PUBLIC_SITE_URL;
    const res = await fetch(
      `${TELEGRAM_API}${token}/setWebhook?url=${domain}/api/webhook/${token}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();

    if (!data.ok) {
      console.error("Webhook error:", data);
      return new Response(
        JSON.stringify({
          ok: false,
          token: newToken,
          error: "Failed to set webhook",
        }),
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Webhook exception:", err);
    return new Response(
      JSON.stringify({ ok: false, token: newToken, error: err.message }),
      {
        status: 500,
      }
    );
  }

  return new Response(JSON.stringify({ ok: true, token: newToken }), {
    status: 200,
  });
}

export async function GET() {
  await connectDB();
  const tokens = await Token.find({});
  if (!tokens) {
    return new Response(JSON.stringify({ ok: true, tokens: [] }), {
      status: 200,
    });
  }
  return new Response(JSON.stringify({ ok: true, tokens }), { status: 200 });
}
