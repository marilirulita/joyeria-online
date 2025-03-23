import fetch from "node-fetch";

async function main() {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: "Admin Bautista",
      email: "admin@joyeria.com",
      password: "Admin2025",
      role: "admin",
      adminToken: "975c60456a92c092ac6d3bd9018b22a2",
    }),
  });

  const data = await response.json();
  console.log("Respuesta del servidor:", data);
}

main();