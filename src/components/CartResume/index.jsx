import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/CartContext";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice.js";
import { Button } from "../Button";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";

export function CartResume() {
  const [finalPrice, setFInalPrice] = useState(0);
  const [deliveryTax] = useState(500);
  const navigate = useNavigate();

  const { cartProducts, clearCart } = useCart();

  useEffect(() => {
    const sumAllItens = cartProducts.reduce((acc, current) => {
      return current.price * current.quantity + acc;
    }, 0);
    setFInalPrice(sumAllItens);
  }, [cartProducts]);

  const submitOrder = async () => {
    const products = cartProducts.map((product) => {
      return {
        id: product.id,
        quantity: product.quantity,
        price: product.price,
      };
    });
    try {
      const { data } = await api.post("/create-payment-intent", { products });
      navigate("/checkout", {
        state: data,
      });
    } catch (err) {
      toast.error("Error, tente novamente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <Container>
        <h2 className="title">Resumo do Pedido</h2>
        <div className="container-top">
          <p className="itens">Itens</p>
          <p className="itensPrice">{formatPrice(finalPrice)}</p>
          <p className="delivery-tax">Taxa de entrega</p>
          <p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
        </div>

        <div className="container-bottom">
          <p>Total</p>
          <p>{formatPrice(finalPrice + deliveryTax)}</p>
        </div>
      </Container>
      <Button onClick={submitOrder}>Finalizar Pedido</Button>
    </div>
  );
}