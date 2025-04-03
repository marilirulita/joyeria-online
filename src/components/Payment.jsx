import React from "react";
import classnames from "classnames";
import { Wallet } from "@mercadopago/sdk-react";
import { Context } from "@/utils/ContextProvider";
import { CarritoContext } from "@/utils/CarritoContext";
import { useRouter } from "next/navigation";

const Payment = () => {
  const { preferenceId, isLoading, setIsLoading } = React.useContext(Context);

  const { carrito, getTotalPrice, borrarCarrito } = React.useContext(CarritoContext);

  const [isReady, setIsReady] = React.useState(false);
    const router = useRouter();

  const paymentClass = classnames("payment-form dark", {
    "payment-form--hidden": !isReady,
  });

  const handleOnReady = () => {
    setIsReady(true);
  };

  // cuando sea pago en sucursal
  const comprar = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productos: carrito }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok) {
        alert("Compra realizada con éxito 🎉");
        borrarCarrito();
      } else {
        alert("Hubo un problema al procesar la compra." + data.error);
      }
    } catch (error) {
      console.error("Error al comprar:", error);
    }
    router.push("/")
  };

  const renderCheckoutButton = (preferenceId) => {
    if (!preferenceId) return null;

    return (
      <Wallet
        initialization={{ preferenceId: preferenceId }}
        onReady={handleOnReady}
        // Custom style example after migration process
        // customization={{
        //   theme: "dark",
        //   customStyle: { borderRadius: "20px" },
        // }}
      />
    );
  };

  return (
    <div className={paymentClass}>
      <div className="container_payment">
        <div className="block-heading">
          <h2>Checkout Payment</h2>
          <p>Mercado Pago integration</p>
        </div>
        <div className="form-payment">
          <div className="products">
            <h2 className="title">Summary</h2>
            {carrito.map((item) => (
              <div className="item" key={item.id}>
                <span className="price" id="summary-price">
                  ${item.precio.toFixed(2)}
                </span>
                <p className="item-name">
                  {item.nombre} X{" "}
                  <span id="summary-quantity">{item.cantidad}</span>
                </p>
              </div>
            ))}

            <div className="total">
              Total
              <span className="price" id="summary-total">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
          </div>
          <div className="payment-details">
            <div className="form-group col-sm-12">
              <button
                   className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-50-600"
                   onClick={comprar}
                   disabled={isLoading}
                 >
                   {isLoading ? "Procesando..." : "Pago en Sucursal"}
                 </button>
                 {renderCheckoutButton(preferenceId)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
