import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Conexión a la base de datos

// ✅ Actualizar producto (PUT)
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { nombre, descripcion, precio, imagen } = await req.json();

    const productoActualizado = await prisma.producto.update({
      where: { id: id },
      data: { nombre, descripcion, precio: parseFloat(precio), imagen },
    });

    return NextResponse.json(productoActualizado, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}

// ✅ Eliminar producto (DELETE)
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await prisma.producto.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Producto eliminado correctamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}