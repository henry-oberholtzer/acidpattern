import styled from "styled-components";
import { Pallete303 } from "./Palette";

const ControlPanel = styled.div`
  display: flex;
  height: 240px;
  width: 1080px;
  background-color: ${Pallete303.ControlPanelColor}`

const BorderContainer = styled.div<{$small?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 104px;
  height: ${props => props.$small? "80px" : "124px" };
  border: 1px solid ${Pallete303.Black};
  margin: 1px;
`
const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `

export { ControlPanel, BorderContainer, VerticalContainer }
