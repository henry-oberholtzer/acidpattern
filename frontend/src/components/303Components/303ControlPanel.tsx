import styled from "styled-components";
import { Pallete303 } from "./Palette";


const ControlPanelFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
  width: 1080px;
  background-color: ${Pallete303.CaseSilver};
  border: 3px solid ${Pallete303.CaseHighlight};
  border-left: 3px solid ${Pallete303.CaseShadow};
  border-bottom: 3px solid ${Pallete303.CaseShadow};
  border-radius: 3px;`

const ControlPanel = styled.div`
  display: flex;
  height: 224px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${Pallete303.CaseShadow};
  border-radius: 2px;
  border-bottom: 2px solid ${Pallete303.CaseHighlight};
  background-color: ${Pallete303.ControlPanelColor};
  width: 1064px;`

const BorderContainer = styled.div<{$small?: boolean, $filled?: boolean, $width?: number, $height?: number, $flexRow?: boolean}>`
  display: flex;
  flex-direction: ${props => props.$flexRow ? "row" : "column"};
  align-items: center;
  width: ${props => props.$width ? props.$width + "px" : "106px"};
  border-radius: 2px;
  background-color: ${props => props.$filled? Pallete303.Black : "transparent"};
  height: ${props => props.$height ? props.$height + "px" : props.$small? "82px" : "126px" };
  border: 1px solid ${Pallete303.Black};
  margin: 1px;
`
const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label<{$silver?: boolean, $small?: boolean, $height?: number, $extraMargin?: boolean, $border?: boolean}>`
  font-family: 'Inter';
  color: ${props => props.$silver ? Pallete303.ControlPanelColor : Pallete303.Black};
  font-size: ${props => props.$small ? "10px" : "12px"};
  margin-top: ${props => props.$extraMargin ? "12px" : "0px"};
  border: ${props => props.$border ? "1px solid" + Pallete303.Black : ""};
  height: ${props => props.$height ? props.$height + "px" : props.$border ? "17px" : "24px"};
  margin-bottom: ${props => props.$border ? "7px" : ""};
  padding: ${props => props.$border ? "0px 2px" : "0"};
  text-align: center;
  text-transform: uppercase;
  user-select: none;
`

const Text = styled.span<{$padding?: number, $fontSize?: number, $noBorder?: boolean}>`
  font-family: 'Inter';
  text-transform: uppercase;
  font-size: ${props => props.$fontSize ? props.$fontSize + "px" : props.$noBorder ? "12px" : "10px" };
  padding: ${props => props.$padding ? props.$padding  + "px"  : "1px" };
  height: 17px;
  border: ${props => props.$noBorder? "None" : "1px solid " + Pallete303.Black};
  margin-right: 1px;
  user-select: none;
  &:last-of-type {
    margin-right: 0;
  }
  `

const TextContainer = styled.div<{$height?: number}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.$height ? props.$height : 24 }px;
  user-select: none;
  `

const MainCase = styled.div`
  font-family: 'Inter';
  width: 1080px;
  height: 520px;
  background-image: radial-gradient(${Pallete303.CaseSilver}, ${Pallete303.CaseShadow} 20%, ${Pallete303.CaseSilver});
  background-color: ${Pallete303.CaseSilver};
  padding-top: 3px;
  border-radius: 3px;
  box-shadow: 3px 3px 30px ${Pallete303.CaseShadow}, -3px -3px 30px ${Pallete303.CaseShadow};`

const CenterFrame = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #000000;
  flex-direction: column;`



export { MainCase, Text, CenterFrame, TextContainer, ControlPanel, ControlPanelFrame, BorderContainer, VerticalContainer, Label }
