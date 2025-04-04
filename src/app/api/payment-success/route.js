import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MercadoPagoConfig, Payment } from "mercadopago";

const ACCES_TOKEN = process.env.MP_ACCESS_TOKEN;

const client = new MercadoPagoConfig({
  accessToken: ACCES_TOKEN,
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");

  if (status === "approved") {
    const payment = await new Payment(client).get({ id: paymentId });

    const cart = payment.metadata.cart;
    const total = cart.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

    try {
      // Verificar si hay suficiente stock antes de vender
      for (const p of cart) {
        const producto = await prisma.producto.findUnique({
          where: { id: p.id },
          select: { stock: true },
        });

        if (!producto || producto.stock < p.cantidad) {
          return NextResponse.json(
            { error: `Stock insuficiente para ${p.nombre}` },
            { status: 400 }
          );
        } else {
          // Crear la venta en la base de datos
          const nuevaVenta = await prisma.venta.create({
            data: {
              total,
              productos: {
                create: cart.map((producto) => ({
                  productoId: producto.id,
                  cantidad: producto.cantidad,
                })),
              },
            },
            include: { productos: true },
          });

          // Reducir el stock de cada producto vendido
          for (const p of cart) {
            await prisma.producto.update({
              where: { id: p.id },
              data: {
                stock: { decrement: p.cantidad }, // Resta la cantidad comprada al stock
              },
            });
          }
        }
      }

      return NextResponse.redirect(new URL("/success", req.url));
    } catch (error) {
      return NextResponse.json(
        { error: "Error al guardar en la base de datos" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Pago no aprobado" }, { status: 400 });
}
