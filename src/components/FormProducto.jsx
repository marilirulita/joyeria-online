import { useState, useEffect } from "react";
import getUserRole from "@/utils/auth";

const FormularioProducto = ({ producto, onActualizar, setEditando }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [stock, setStock] = useState("");

  // Si hay un producto, llenar el formulario con sus datos (modo edición)
  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setPrecio(producto.precio);
      setImagen(producto.imagen);
      setStock(producto.stock);
    }
  }, [producto]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getUserRole();
    const datosProducto = { nombre, descripcion, precio, imagen, stock, adminToken: token };

    try {
      const response = await fetch(
        producto ? `/api/productos/${producto.id}` : "/api/productos",
        {
          method: producto ? "PUT" : "POST",
          headers: { 
            "Content-Type": "application/json" 
            },
          body: JSON.stringify(datosProducto),
        }
      );

      if (response.ok) {
        onActualizar(); // Refresca la lista de productos
        setEditando ? setEditando(false) : null;

        // Limpiar formulario
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setImagen("");
        setStock("");
      } else {
        console.error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-3">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="border p-2"
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {producto ? "Actualizar" : "Agregar"} Producto
      </button>
      <button
          onClick={() => setEditando(false)}
          className="bg-gray-500 text-white p-2 rounded mt-2"
        >
          Cancelar
        </button>
    </form>
  );
};

export default FormularioProducto;
