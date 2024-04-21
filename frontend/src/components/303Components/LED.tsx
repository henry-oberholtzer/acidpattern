/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components"
import { Pallete303  } from "./Palette"

const Div = styled.div<{ $active?: boolean }>`
  border: 1px solid transparent;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  margin: 12px;
  background-image: ${props => props.$active ? Pallete303.LEDGradientActive : Pallete303.LEDGradientOff};
  background-color: ${Pallete303.LEDRedActive};
  box-shadow: ${props => props.$active ? `0 0 8px ${Pallete303.LEDRedActiveHighlight}` : ""}
`

const LED = (props: LEDProps) => {
  const { active } = props
  return (
    <Div $active={active}/>
  )
}

interface LEDProps {
  active?: boolean;
}

export { LED }
