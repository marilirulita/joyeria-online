import fetch from "node-fetch";

async function main() {
  const response = await fetch("https://joyeria-online-steel.vercel.app/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: "Admin Dany",
      email: "dany@joyeria.com",
      password: "Admin2025",
      role: "admin",
      adminToken: "975c60456a92c092ac6d3bd9018b22a2",
    }),
  });

  const data = await response.json();
  console.log("Respuesta del servidor:", data);
}

main();