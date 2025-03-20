import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.usuario.findMany();
    return NextResponse.json({ message: "Conexión exitosa", users }, { status: 200 });
  } catch (error) {
    console.error("❌ ERROR EN DB:", error.message, error.stack);
    return NextResponse.json({ message: "Error al conectar a la base de datos" }, { status: 500 });
  }
}
