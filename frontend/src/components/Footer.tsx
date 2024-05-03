import styled from "styled-components"
import { Pallete303 } from "./303Components/Palette"
import { getYear } from "date-fns"

const FooterFrame = styled.footer`
  width: 100%;
  height: 60px;
  font-family: 'Inter';
  font-size: 12px;
  color: ${Pallete303.CaseSilver};
  padding: 0px 20px 0px 20px;
  background-color: ${Pallete303.Black};
  display: flex;
  align-items: center;
  justify-content: space-between;`

const Attribution = styled.a`
  color: ${Pallete303.CaseSilver};
  text-decoration: underline;
  &:hover, &:focus {
    color: ${Pallete303.CaseHighlight};
  }
  `

const Footer = () => {
  return (
    <FooterFrame>
      <Attribution href="https://bdsmovement.net/" target="blank">Free Palestine 🇵🇸</Attribution>
      <p><Attribution href="https://henryoberholtzer.com/" target="blank">Henry Oberholtzer {getYear(Date.now())}</Attribution></p>
      <Attribution href="https://github.com/henry-oberholtzer/acidpattern/issues" target="blank">Contribute 🛠️</Attribution>
    </FooterFrame>
  )
}

export { Footer }
