import styled from "styled-components";
import { Pallete303 } from "./Palette";

const Button = styled.button<{$horizontal?: boolean, $large?: boolean }>`
  width: ${props => props.$large ? "70px" : props.$horizontal ? "46px" : "22px"};
  height: ${props => props.$horizontal ? "22px" : "46px"};
  background-color: ${Pallete303.ButtonColor};
  border-top: 4px solid ${Pallete303.CaseHighlight};
  border-bottom: 4px solid ${Pallete303.CaseShadow};
  border-left: 4px solid ${Pallete303.ButtonLeft};
  border-right: 4px solid ${Pallete303.ButtonRight};
  transition: 50ms background-color;
  &:focus, &:hover {
    cursor: pointer;
    background-color: ${Pallete303.ButtonColorActive};
  }
  `

const Div = styled.div<{$horizontal?: boolean, $large?: boolean }>`
display: flex;
justify-content: center;
align-items: center;
width: ${props => props.$large ? "72px" : props.$horizontal ? "48px" : "24px"};
height: ${props => props.$horizontal ? "24px" : "48px"};
background-color: ${Pallete303.CaseShadow};
`

const ButtonTB = (props: ButtonProps) => {
  return (
    <Div
      $horizontal={props.horizontal}
      $large={props.large}>
      <Button
        $horizontal={props.horizontal}
        $large={props.large}
        name={props.name}
        onClick={props.onClick}
        
        onPointerDown={props.onMouseDown}
        onPointerUp={props.onMouseUp}
        onPointerLeave={props.onPointerLeave}/>
    </Div>
  )
}

interface ButtonProps {
  horizontal?: boolean;
  large?: boolean;
  name?: string;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onPointerLeave?: () => void;
}

export { ButtonTB }
