import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { CarritoProvider } from "@/utils/CarritoContext";
import { ToastContainer } from 'react-toastify';
import "./globals.css";

export const metadata = {
  title: "Joyeria Online",
  description: "Tienda Online de Joyeria",
}; 

export default function RootLayout({ children }) {

  return (
     <CarritoProvider> 
    <html lang="en">
      <body className="flex flex-col min-h-screen">
         <Navbar /> 
        <ToastContainer /> {/* Agregarlo aquí para que funcione */}
        <main className="mt-17 flex-grow p-4">
        {children}
        </main>
        <Footer /> 
      </body>
    </html>
     </CarritoProvider>
  );
}
