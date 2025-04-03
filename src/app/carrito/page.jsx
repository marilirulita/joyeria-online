'use client';

import { useState} from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Payment from "@/components/Payment";
import Checkout from "@/components/Checkout";
import InternalProvider from "@/utils/ContextProvider";
import { useContext } from "react";
import { CarritoContext } from "@/utils/CarritoContext";

// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
initMercadoPago('APP_USR-81fb5b83-1e9f-401a-82be-8f49799a3b4a', { locale: 'en' });

const App = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { carrito } = useContext(CarritoContext);

  const handleClick = () => {
    setIsLoading(true);
    fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carrito),
    })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        setPreferenceId(preference.preferenceId);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setIsLoading(false);
      })
  };

  return (
    <InternalProvider context={{ preferenceId, isLoading, setIsLoading }}>
      <div>
        <Checkout onClick={handleClick} description/>
        <Payment />
      </div>
    </InternalProvider>
  );
};

export default App;
