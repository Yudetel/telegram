import Token from "@/models/Token";
import { connectDB } from "@/lib/mongoose";

const TELEGRAM_API = "https://api.telegram.org/bot";

export async function POST(req) {
  await connectDB();
  const { name, token } = await req.json();

  if (!name || !token)
    return new Response(
      JSON.stringify({ ok: false, error: "Missing fields" }),
      { status: 400 }
    );

  // Створюємо новий токен у MongoDB
  const newToken = await Token.create({ name, token });

  // Автоматично ставимо webhook для нового бота
  try {
    const domain = process.env.NEXT_PUBLIC_SITE_URL; // Домен твоєї адмінки / сайту на Vercel
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
