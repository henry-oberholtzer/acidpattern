import { NavigationButton } from "./UI"
import styled from "styled-components"

const Nav = styled.nav`
display: flex;
flex-direction: row;
gap: 10px;
`

const Navigation = () => {
  return (
    <Nav>
      <NavigationButton
        to={"/"}
        text={"write"}
      />
      <NavigationButton
        to={"/patterns"}
        text={"patterns"}
      />
    </Nav>
  )
}

export { Navigation }
