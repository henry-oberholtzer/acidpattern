import { NavigationButton } from "./UI"
import styled from "styled-components"

const Nav = styled.nav`
display: flex;
flex-direction: row;
`

const Navigation = () => {
  return (
    <Nav>
      <NavigationButton
        to={"/patterns"}
        text={"patterns"}
      />
      <NavigationButton
        to={"/patterns/write"}
        text={"write"}
      />
    </Nav>
  )
}

export { Navigation }
