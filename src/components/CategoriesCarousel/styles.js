import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  padding-left: 40px;

   .carousel-item {
     padding-right: 40px;
   }

`

export const Title = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: #9758a6;
  padding-bottom: 12px;
  position: relative;
  text-align: center;
  margin-bottom: 40px;
  
  &::after{
    content: "";
    position: absolute;
    bottom: 0;
    width: 56px;
    height: 4px;
    background-color: #9758a6;
    left: calc(50% - 28px);
  }
`

export const ContainerItens = styled.div`
  background: url("${(props) => props.imageUrl}"),no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 15px;

  display: flex;
  align-items: center;
  padding: 20px 10px;
  width: 100%;
  height: 200px;

  
`

export const CategoryButton = styled(Link)`
    color: white;
    background-color: rgba(0,0,0, 0.5);
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 22.5px;
    font-weight: bold;
    margin-top: 50px;
    font-weight: 500;
    text-decoration: none;
    transition: 0.5s;

    &&:hover{
      background-color: #9758a6;
      
    }

`