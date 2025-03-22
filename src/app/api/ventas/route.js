import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// 📌 Obtener todas las ventas
export async function GET() {
  try {
    const ventas = await prisma.venta.findMany({
      include: { 
        productos: {
          include: {
            producto: true,
          },
        },
      },
    });
    return NextResponse.json(ventas, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener ventas" }, { status: 500 });
  }
}

// 📌 Registrar una venta
export async function POST(req) {
  try {
    const data = await req.json();
    const { productos } = data;

    if (!productos || productos.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    // Verificar si hay suficiente stock antes de vender
for (const p of productos) {
  const producto = await prisma.producto.findUnique({
    where: { id: p.id },
    select: { stock: true },
  });

  if (!producto || producto.stock < p.cantidad) {
    return NextResponse.json({ message: `Stock insuficiente para ${p.id}` }, { status: 400 });
  } else {
    const total = productos.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

    // Crear la venta en la base de datos
    const nuevaVenta = await prisma.venta.create({
      data: {
        total,
        productos: {
          create: productos.map((producto) => ({
            productoId: producto.id,
            cantidad: producto.cantidad,
          })),
        },
      },
      include: { productos: true },
    });

    // Reducir el stock de cada producto vendido
    for (const p of productos) {
      await prisma.producto.update({
        where: { id: p.id },
        data: {
          stock: { decrement: p.cantidad }, // Resta la cantidad comprada al stock
        },
      });
    }
  }
}

    return NextResponse.json({ message: "Nueva venta creada" }, { status: 201 });
  } catch (error) {
    console.error("Error al registrar la venta:", error);
    return NextResponse.json({ message: "Error al registrar la venta" }, { status: 500 });
  }
}

