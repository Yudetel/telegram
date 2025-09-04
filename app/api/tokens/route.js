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

  return new Response(JSON.stringify({ ok: true, token: newToken }), {
    status: 200,
  });
}

export async function GET() {
  await connectDB();
  const tokens = await Token.find({});
  return new Response(JSON.stringify({ ok: true, tokens }), { status: 200 });
}
