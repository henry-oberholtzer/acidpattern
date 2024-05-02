import { Pallete303 } from "./303Components/Palette"
import { Navigation } from "./Navigation"
import { Logo } from "./UI"
import { UserWidget } from "./UserWidget"
import styled from "styled-components"

const HeaderDiv = styled.div`
padding: 20px;
display: flex;
z-index: 3;
align-items: center;
justify-content: space-between;
height: 60px;
width: 100%;
background-color: ${Pallete303.CaseSilver};
border-radius: 0px 0px 5px 5px;
border-top: 3px solid ${Pallete303.CaseHighlight};
border-bottom: 3px solid ${Pallete303.CaseShadow};
`

const LineDivider = styled.div`
  height: 40px;
  border-left: 2px solid ${Pallete303.Black};
  margin: 6px 24px;`

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  `

const Header = () => {
  return (
    <HeaderDiv>
      <HeaderSection>
        <Logo/>
        <LineDivider />
        <Navigation />
      </HeaderSection>
      <HeaderSection>
        <LineDivider />
        <UserWidget />
      </HeaderSection>
    </HeaderDiv>
  )
}


export { Header }
