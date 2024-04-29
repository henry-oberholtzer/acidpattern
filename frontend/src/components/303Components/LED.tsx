/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components"
import { Pallete303  } from "./Palette"

const Div = styled.div<{ $active?: boolean, $margin?: string }>`
  border: 1px solid transparent;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  margin: ${props => props.$margin? props.$margin : "6px"};
  background-image: ${props => props.$active ? Pallete303.LEDGradientActive : Pallete303.LEDGradientOff};
  background-color: ${Pallete303.LEDRedActive};
  box-shadow: ${props => props.$active ? `0 0 8px ${Pallete303.LEDRedActive}, 0 0 4px ${Pallete303.LEDRedActiveHighlight}` : ""}
`

const LED = (props: LEDProps) => {
  const { active } = props
  return (
    <Div $active={active} $margin={props.margin}/>
  )
}

interface LEDProps {
  active?: boolean;
  margin?: string;
}

export { LED }
