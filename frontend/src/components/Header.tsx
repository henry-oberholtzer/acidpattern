import { Pallete303 } from "./303Components/Palette"
import { Navigation } from "./Navigation"
import { Logo } from "./UI"
import { UserWidget } from "./UserWidget"
import styled from "styled-components"

const HeaderDiv = styled.div`
padding: 20px;
display: flex;
align-items: center;
height: 80px;
width: 100%;
background-color: ${Pallete303.Black}
`

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  `

const Header = () => {
  return (
    <HeaderDiv>
      <HeaderSection>
        <Logo/>
        <Navigation />
      </HeaderSection>
      <UserWidget />
    </HeaderDiv>
  )
}


export default Header
