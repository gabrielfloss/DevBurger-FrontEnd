import styled from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  margin-bottom: 20px;

  *{
    color: #484848;
    font-weight: 500;
  }

  .title{
        grid-area: "title";
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
        background-color: #484848;
        color: white;
        width: 100%;
        padding: 15px;
        text-align: center;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
  .container-top{
      display: grid;
      
      grid-gap: 20px 30%;
      grid-template-areas: 
      "title title"
      "itens itensPrice"
      "delivery-tax delivery-tax-price";

    .itens{
        grid-area: itens;
        padding-left: 20px;
    }
    .itensPrice{
        grid-area: itensPrice;
        padding-right: 20px;
    }
    .delivery-tax{
        grid-area: delivery-tax;
        padding-left: 20px;
    }
    .delivery-tax-price{
        grid-area: delivery-tax-price;
        padding-right: 20px;
    }
    
  }
    
    .container-bottom{
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 700;
      margin-top: 24px;
      padding: 20px;

      *{
       color: #484848;
       font-weight: 700;
      }
  }

`