import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productos = await prisma.producto.findMany();
    return NextResponse.json(productos, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener productos" }, { status: 500 });
  }
}
