import { useState } from "react";
import Image from "next/image";
import FormularioProducto from "./FormProducto";

const ProductoCard = ({ producto, onActualizar }) => {
  const [editando, setEditando] = useState(false);

  const eliminarProducto = async (id) => {
    const res = await fetch(`/api/productos/${id}`, { method: "DELETE" });
    if (res.ok) {
      onActualizar();
    } else {
      console.error("Error al eliminar el producto");
    }
  };

  return (
    <li key={producto.id} className="border rounded-lg shadow-md p-4 my-2">
      {editando ? (
        <FormularioProducto producto={producto} onActualizar={onActualizar} setEditando={setEditando} />
      ) : (
        <div className="border-b py-2 flex justify-between">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            width={100}
            height={100}
            className="rounded-lg"
          />
          <div>
            <h2 className="text-lg font-semibold mt-2">{producto.nombre}</h2>
            <p className="text-gray-600">{producto.descripcion}</p>
            <p className="text-xl font-bold mt-2 text-green-600"><span>${producto.precio}</span> 
            </p>
            <p className="text-md text-orange-500">{producto.stock} piezas</p>
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => setEditando(true)}
              className="bg-yellow-500 text-white p-2 rounded mt-2"
            >
              Editar
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded mt-2"
              onClick={() => eliminarProducto(producto.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default ProductoCard;
