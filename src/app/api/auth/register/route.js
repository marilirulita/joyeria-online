import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {

  try {
    const { nombre, email, password, role, adminToken } = await req.json();

    // Verificar que el request venga de un admin
    if (adminToken !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ message: "No autorizado" }, { status: 403 });
    }

    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Contraseña encriptada:", hashedPassword); // 👀 Verifica la contraseña encriptada

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        role: role || "usuario",
      },
    });

    return NextResponse.json(
      { message: "Usuario creado", usuario: nuevoUsuario },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ ERROR:", error.message, error.stack);
    return NextResponse.json(
      { message: "Error del servidor" },
      { status: 500 }
    );
  }
}
