import styled from "styled-components"
import { Pallete303 } from "../303Components/Palette"

const LCDContainer = styled.div<{ $width?: number, $height?: number, }>`
  ${props => props.$width ? `width: ${props.$width}px;` : ""}
  ${props => props.$height ? `height: ${props.$height}px;` : ""}
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: '5x7 Pixel';
  display: flex;
  flex-direction: column;
  text-rendering: geometricPrecision;
  color: ${Pallete303.LCDFont};
  border-top: 3px solid ${Pallete303.CaseShadow};
  border-bottom: 3px solid ${Pallete303.CaseHighlight};
  border-left: 3px solid ${Pallete303.ButtonRight};
  border-right: 3px solid ${Pallete303.ButtonLeft};
  background-color: ${Pallete303.LCDBackground};
  padding: 4px;`

export { LCDContainer }
