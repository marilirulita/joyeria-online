import { jwtDecode } from "jwt-decode";

export default function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null; // Si no hay token, el usuario no está logueado

  try {
    const decoded = jwtDecode(token);
    return decoded.role; // Retorna 'admin' o 'cliente'
  } catch (error) {
    console.error("Error al decodificar token", error);
    return null;
  }
}

export const verifyAdmin = (req) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return { error: "Acceso denegado. Token no proporcionado." };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== "admin") {
      return { error: "Acceso denegado. No tienes permisos de administrador." };
    }

    return { user: decoded }; // Retorna la información del usuario si es admin
  } catch (error) {
    return { error: "Token inválido o expirado." };
  }
};
