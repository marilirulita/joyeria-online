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
