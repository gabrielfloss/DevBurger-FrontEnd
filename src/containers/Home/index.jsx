import { CategoriesCarousel, OffersCarousel } from "../../components/index.js";

import { Banner, Container } from "./styles";
import { UseUser } from "../../hooks/UserContext";

export function Home() {
  console.log(UseUser());

  return (
    <main>
      <Banner>
        <h1>Bem-Vindo(a)!</h1>
      </Banner>
      <Container>
        <div>
          <CategoriesCarousel />
          <OffersCarousel />
        </div>
      </Container>
    </main>
  );
}
