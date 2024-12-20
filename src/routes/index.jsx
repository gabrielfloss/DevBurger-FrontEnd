import { createBrowserRouter } from "react-router-dom";

import { Cart, Checkout, CompletePayment, Home, Login, Menu, Register } from "../containers/index.js";
import { Header, Footer } from "../components/index.js";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/cardapio",
    element:(
        <>
        <Header />
         <Menu />,
        </>
    )
},
  {
    path: "/carrinho",
    element: (
      <>
      <Header />
        <Cart />,
        <Footer />
      </>
    ),
  },
  {
    path: "/checkout",
    element: <Checkout/>,
  },
  {
    path: "/complete",
    element: <CompletePayment/>,
  },
]);
