import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 bottom-0">
      <div className="container mx-auto text-center">
      <p>Contacto: <a href="mailto:contacto@tu-tienda.com" className="underline">contacto@joyeria.com</a></p>
        <h2 className="text-lg font-semibold mb-3">Síguenos en redes sociales</h2>
        <div className="flex justify-center space-x-6">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <FaFacebookF size={24} />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition">
            <FaTiktok size={24} />
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
            <FaWhatsapp size={24} />
          </a>
        </div>
        <p className="mt-4 text-gray-400">© 2025 Mi Tienda - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
