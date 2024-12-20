import Logo from "../../assets/Logo 1.svg"
import { CartItems, CartResume } from "../../components";
import { Banner, Container, Title, Content } from "./styles";

export function Cart() {
  return (
    <Container>
      <Banner>
        <img src={Logo} alt="" />
      </Banner>
      <Title>Checkout - Pedido</Title>
      <Content>
        <CartItems/>
        <CartResume/>
      </Content>
    </Container>
  );
}
