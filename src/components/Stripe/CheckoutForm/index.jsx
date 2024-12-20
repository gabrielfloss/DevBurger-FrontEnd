import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../styles.css";

import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { useCart } from "../../../hooks/CartContext";

export default function CheckoutForm() {
  const { cartProducts, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const {
    state: { dpmCheckerLink },
  } = useLocation();

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe or Failed elements, please try again");
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        const products = cartProducts.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          };
        });

        const { status } = await api.post(
          "/orders",
          { products },
          {
            validateStatus: () => true,
          },
        );

        if (status === 200 || 201) {
          setTimeout(() => {
            navigate(`/complete?payment_intent_client_secret=${paymentIntent}`);
            clearCart();
          }, 3000);
          clearCart();
          toast.success("Pedido realizado com sucesso!");
        } else if (status === 409) {
          toast.error("Falha ao realizar seu pedido.");
        } else {
          throw new Error();
        }
      } catch (error) {
        toast.error("Falha no Sistema! Tente Novamente. 😕");
      }
    }else{
      toast.error("Falha no Sistema! Tente Novamente. 😕");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <CheckoutForm />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pagar Agora"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
      <div id="dpm-annotation">
        <p>
          Os métodos de pagamento são exibidos dinamicamente com base na
          localização do cliente, valor do pedido e moeda.&nbsp;
          <a
            href={dpmCheckerLink}
            target="_blank"
            rel="noopener noreferrer"
            id="dpm-integration-checker"
          >
            Ver métodos de Pagamento
          </a>
        </p>
      </div>
    </div>
  );
}