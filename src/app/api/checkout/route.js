import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const ACCES_TOKEN = process.env.MP_ACCESS_TOKEN;
const client = new MercadoPagoConfig({
  accessToken: ACCES_TOKEN
});

export async function POST(req) {
  try {
    const body = await req.json();

    console.log(process.env.MP_ACCESS_TOKEN)
    console.log(process.env.ADMIN_SECRET)

    const items = body.map((producto) => ({
      title: producto.nombre,
      unit_price: Number(producto.precio),
      quantity: Number(producto.cantidad),
      currency_id: "MXN",
    })) 

      const cart = body.map((producto) => ({
        id: producto.id,
        precio: Number(producto.precio),
        cantidad: Number(producto.cantidad),
      })) 

    if (items.length <= 0) {
      return NextResponse.json({ error: "No hay datos del carrito de compra" }, { status: 400 });
    } 

    const preference = await new Preference(client).create({
      body: {
        items: items,
        back_urls: {
          success: "http://localhost:3000/api/payment-success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
        auto_return: "approved",
        metadata: {
          cart: cart
      }
      },
    });

    // preference.init_point
    // preference.id
    return NextResponse.json({ preferenceId: preference.id }, { status: 200 });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
