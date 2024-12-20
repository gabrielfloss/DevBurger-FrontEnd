import {
  Container,
  Content,
  HeaderLink,
  LinkContainer,
  Logout,
  Navigation,
  Options,
  Profile,
} from "./styles";

import { useNavigate, useResolvedPath } from "react-router-dom";

import { UserCircle, ShoppingCart } from "@phosphor-icons/react";
import { UseUser } from "../../hooks/UserContext";

export function Header() {
  const navigate = useNavigate()
  const {pathname} = useResolvedPath()
  const { logout, userInfo } = UseUser()
 
  function logoutUser(){
    logout()
    navigate("/login")
  }

  return (
    <Container>
      <Content>
        <Navigation>
          <div>
            <HeaderLink to={"/"} $isActive={pathname === "/"} >Home</HeaderLink>
            <hr />
            <HeaderLink to={"/cardapio"} $isActive={pathname === "/cardapio"} >Cardapio</HeaderLink>
          </div>
        </Navigation>
        <Options>
          <Profile>
            <UserCircle color="white" size={24} />
            <div>
              <p>
                Olá, <span>{userInfo.name}</span>
              </p>
              <Logout onClick={logoutUser}>Sair</Logout>
            </div>
          </Profile>
          <LinkContainer>
            <ShoppingCart color="white" size={24} />
            <HeaderLink to="/carrinho" >Carrinho</HeaderLink>
          </LinkContainer>
        </Options>
      </Content>
    </Container>
  );
}
