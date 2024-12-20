import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../../config/stripeConfig";
import CheckoutForm from "../../components/Stripe/CheckoutForm";


export function Checkout() {
  const [clientSecret, setClientSecret] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchClientSecret = async () => {
      
      try {
        const response = await fetch('/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({data})
        });
        
        if (!response.ok) {
          throw new Error('Erro na requisição do clientSecret');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        console.log("clientSecret recebido:", data.clientSecret);
      } catch (error) {
        console.error("Erro ao buscar clientSecret:", error);
      }
    };

    fetchClientSecret();
  }, []);

  

  if (!clientSecret) {
    console.error("clientSecret está faltando!");
    return <div>Erro, volte e tente novamente.</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}