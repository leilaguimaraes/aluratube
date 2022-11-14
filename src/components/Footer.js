import styled from "styled-components";

const StyledFooter = styled.div`
footer{
  background-color: ${({ theme }) => theme.backgroundLevel2};
  text-align: center ;
  padding: 32px ;
  color: ${({ theme }) => theme.backgroundLevel1};
}
a{
  color: ${({ theme }) => theme.backgroundLevel1};
}
`

export function Footer(){
return (
  <StyledFooter>
    <footer> Feito com 💜 por <a href="https://github.com/leilaguimaraes" target="_blank">Leila Guimarães</a> </footer>
  </StyledFooter>
)
}