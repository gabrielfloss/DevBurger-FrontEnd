import { CartProvider } from "./CartContext";
import { UseProvider } from "./UserContext";

const AppProvider = ({ children }) => {
  return (
    <UseProvider>
      <CartProvider>{children}</CartProvider>
    </UseProvider>
  );
};

export default AppProvider;
