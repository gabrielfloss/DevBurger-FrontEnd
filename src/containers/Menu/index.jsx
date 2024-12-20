import { useEffect,  useState} from "react";
import { Container, Banner, CategoriesMenu, ProductsContainer, CategoryButton } from "./styles";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";
import { CardProduct } from "../../components/CardProduct";
import { useLocation, useNavigate } from "react-router-dom";


export function Menu() {
  const [ categories, setCategories] = useState([]);
  const [ products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([])

  const navigate = useNavigate()

  const { search } = useLocation()

  const queryParams = new URLSearchParams(search);

  const [activeCategory, setactiveCategory] = useState(() =>{
    const categoryId = +queryParams.get("categoria")

    if(categoryId){
      return categoryId
    }else{
      return 0
    }
  });

  useEffect(() => {
    async function loadCategories() {
      const {data} = await api.get("/categories");

      const newCategories = [{id:0, name: "Todas"},...data];

      setCategories(newCategories);
    }

    async function loadProducts() {
      const {data} = await api.get("/products");

      const newProducts = data
      .map((product) => ({
        curerencyValue: formatPrice(product.price),
        ...product,
      }))
      
      setProducts(newProducts);   
    }
    loadProducts();

    loadCategories();
  }, []);

  useEffect(() => {
    if(activeCategory === 0){
      setfilteredProducts(products)
    }else{
      const newFilteredProducts = products.filter(
        product => product.category_id === activeCategory,
      );

      setfilteredProducts(newFilteredProducts)
    }
  }, [products, activeCategory])

  return (
    <Container>
      <Banner>
        <h1>
          O MELHOR <br /> HAMBURGUER <br /> ESTÁ AQUI
          <span>Esse cardápio está irresistível!</span>
        </h1>
      </Banner>

      <CategoriesMenu>
        {categories.map(category => (
          <CategoryButton 
          $isActiveCategory={category.id === activeCategory}
          key={category.id}
          
          onClick={() => {
            navigate(
              {
                pathname: "/cardapio",
                search: `?categoria=${category.id}`,
              },
              {
                replace: true
              },
            );
            setactiveCategory(category.id);
          }}
          
          >
            {category.name}
            </CategoryButton>
        ))}
      </CategoriesMenu >

      <ProductsContainer>
        {filteredProducts.map(product => (
           <CardProduct product={product} key={product.id} />
          ))}
      </ProductsContainer>
    </Container>
  );
}
