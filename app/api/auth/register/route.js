import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email і пароль обовʼязкові" },
        { status: 400 }
      );
    }

    await connectDB();

    // Перевіряємо чи юзер вже існує
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { ok: false, error: "Користувач з таким email вже існує" },
        { status: 400 }
      );
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { ok: false, error: "Помилка сервера" },
      { status: 500 }
    );
  }
}
