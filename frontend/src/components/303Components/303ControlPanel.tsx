import styled from "styled-components";
import { Pallete303 } from "./Palette";


const ControlPanel = styled.div`
  display: flex;
  height: 240px;
  width: 1080px;
  background-color: ${Pallete303.ControlPanelColor}`

const BorderContainer = styled.div<{$small?: boolean, $filled?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 106px;
  border-radius: 2px;
  background-color: ${props => props.$filled? Pallete303.Black : "transparent"};
  height: ${props => props.$small? "80px" : "124px" };
  border: 1px solid ${Pallete303.Black};
  margin: 1px;
`
const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ParentContainer = styled.div`
  font-family: 'Inter';
`

const Label = styled.label<{$silver?: boolean, $small?: boolean, $extraMargin?: boolean, $border?: boolean}>`
  font-family: 'Inter';
  color: ${props => props.$silver ? Pallete303.ControlPanelColor : Pallete303.Black};
  font-size: ${props => props.$small ? "10px" : "12px"};
  margin-top: ${props => props.$extraMargin ? "12px" : "0px"};
  border: ${props => props.$border ? "1px solid" + Pallete303.Black : ""};
  height: ${props => props.$border ? "17px" : "24px"};
  margin-bottom: ${props => props.$border ? "7px" : ""};
  text-transform: uppercase;
  user-select: none;
`

const Text = styled.span<{$padding?: string, $fontSize?: string}>`
  font-family: 'Inter';
  font-size: ${props => props.$fontSize ? props.$fontSize : "10px" };
  padding: ${props => props.$padding ? props.$padding : "1px" };
  height: 17px;
  border: 1px solid ${Pallete303.Black};
  margin-right: 1px;
  user-select: none;
  &:last-of-type {
    margin-right: 0;
  }
  `

const TextContainer = styled.div`\
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  user-select: none;
  `

export { ParentContainer, Text, TextContainer, ControlPanel, BorderContainer, VerticalContainer, Label }
