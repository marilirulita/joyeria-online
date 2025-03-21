import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { nombre, email, password } = await req.json();

    // Revisar si el usuario ya existe
    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "El usuario ya existe" }, { status: 400 });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario con rol 'user'
    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        role: "user", // Siempre será un usuario normal
      },
    });

    return NextResponse.json({ message: "Cuenta creada", user: newUser });
  } catch (error) {
    return NextResponse.json({ message: "Error al registrar usuario" }, { status: 500 });
  }
}