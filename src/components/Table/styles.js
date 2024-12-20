import styled from "styled-components";

export const Root = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: aliceblue;
  border-radius: 29px;
`

export const Header = styled.thead``

export const Tr = styled.tr``

export const Th = styled.th`
  padding: 16px;
  text-align: left;
  color: #fff;
  border-bottom: 1px solid #cdcdcd;
  background-color: #484848;

  &:last-child{
    border-top-right-radius: 20px;
  }
  &:first-child{
    border-top-left-radius: 20px;
  }
`

export const Td = styled.td`
  padding: 16px;
  color: #484848;
  line-height: 115%;
`


export const Body = styled.tbody`
`