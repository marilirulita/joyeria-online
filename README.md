# 🛒 Joyería App

Una aplicación completa para ventas en línea de joyería, con integración de pagos mediante Mercado Pago, manejo de carrito de compras, control de stock, y un panel administrativo para gestionar ventas.

---

## 🌐 Sitio en producción

👉 [Ver la aplicación en vivo](https://joyeria-online-steel.vercel.app/)

## 📽️ Video de demostración

[![Demo del proyecto](https://img.youtube.com/vi/r9ztWeVUgIs/0.jpg)](https://www.youtube.com/watch?v=r9ztWeVUgIs)

## 🚀 Tecnologías utilizadas

- **Next.js** (React framework)
- **Tailwind CSS** para estilos
- **Prisma ORM**
- **PostgreSQL** (base de datos en Neon)
- **Mercado Pago** (Checkout Pro)
- **Vercel** (Hosting)

## 🧾 Funcionalidades

- 🛍️ Catálogo de productos

- 🛒 Carrito de compras

- 💳 Checkout con Mercado Pago

- 📊 Registro de ventas

- 👤 Panel de administración

- 📦 Gestión de stock

---

## 🛠️ Instalación local

1. Clona el repositorio:

  ```bash
  git clone git@github.com:marilirulita/joyeria-online.git
  cd joyeria-app

  ```

2. Instala dependencias:

  ```
  npm install
  ```

3. Crea un archivo .env en la raíz con las siguientes variables:

```
DATABASE_URL=postgresql://<usuario>:<contraseña>@<host>:<puerto>/<nombre_db>?sslmode=require

NEXT_PUBLIC_MP_PUBLIC_KEY=tu_public_key_de_mercado_pago

MP_ACCESS_TOKEN=tu_access_token_de_mercado_pago

NEXTAUTH_SECRET=tu_next_auth_secret

ADMIN_SECRET=tu_admin_secret_code
```

4. Ejecuta las migraciones y genera Prisma Client:

```
npx prisma generate
npx prisma migrate dev
```

5. Corre la app:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Deploy

El proyecto está desplegado en Vercel y conectado a una base de datos Neon PostgreSQL.

## 👩‍💻 Contribuciones

¡Contribuciones abiertas! Si tienes ideas para mejorar la app, corrige errores o agrega nuevas funcionalidades, no dudes en hacer un fork y abrir un PR.

1. Haz un fork del repositorio

2. Crea una rama con tu cambio: `git checkout -b mi-nueva-funcion`

3. Haz tus cambios y haz commit: `git commit -m "Agrega nueva función"`

4. Sube tus cambios: `git push origin mi-nueva-funcion`

5. Abre un Pull Request 🚀

## 📄 Licencia

MIT © [Joyeria Online](LICENSE)
