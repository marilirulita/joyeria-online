import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const productos = await prisma.producto.findMany();
    return Response.json(productos, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}

export async function POST(req) {

  try {
    const { nombre, descripcion, precio, imagen, stock, adminToken } = await req.json();

    // Verificar que el request venga de un admin
        if (adminToken !== "admin") {
          return NextResponse.json({ message: "No autorizado" }, { status: 403 });
        }

    const nuevoProducto = await prisma.producto.create({
      data: { nombre, descripcion, precio: parseFloat(precio), imagen, stock: parseInt(stock) },
    });

    return Response.json(nuevoProducto, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Error al crear producto" }, { status: 500 });
  }
}
