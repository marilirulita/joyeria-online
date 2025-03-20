import fetch from "node-fetch";

async function main() {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: "Mar Bautista",
      email: "admin@joyeria.com",
      password: "Admin2025",
      role: "admin",
    }),
  });

  const data = await response.json();
  console.log("Respuesta del servidor:", data);
}

main();