const { PrismaClient } = require('@prisma/client');
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = "A5GkQcZnh0bP0b5OmYHUmmaoBo0r37Mdrq7eKitChS8=";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.usuario.findUnique({ where: { email } });

    if (!user) {
      return Response.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }

    // Generar JWT
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return Response.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error en el login:", error); // 🔍 Esto mostrará el error real en la terminal
    return Response.json({ message: "Error en el servidor", error: error.message }, { status: 500 });
  }
}