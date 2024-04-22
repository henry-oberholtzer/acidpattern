import styled from "styled-components"
import { Pallete303 } from "./Palette"
import { ButtonTB, LED } from "."

const KeyDiv = styled.div<{$index?: number}>`
  width: 32px;
  height: 94px;
  display: flex;
  position: absolute;
  left: ${props => props.$index? (props.$index * 60) + 277 + "px" : "277px"};
  top: 171px;
  flex-direction: column;
  border-radius: 0 0 4px 4px;
  `



const NameLabel = styled.label`
  user-select: none;
  width: 32px;
  height: 16px;
  font-size: 12px;
  background-color: ${Pallete303.Black};
  color: ${Pallete303.ControlPanelColor};
  text-align: center;`

const SwitchDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 88px;
    background-color: ${Pallete303.Black};
    border-top: 1px solid ${Pallete303.ControlPanelColor};
    border-radius: 0 0 4px 4px;
    padding: 0 0 15px;`

const KeySharp = (props: KeySharpProps) => {
  return (
    <>
      <KeyDiv $index={props.index}>
      
      <NameLabel htmlFor={props.name}>
        {props.name}
      </NameLabel>
        <SwitchDiv>
          <LED />
          <ButtonTB 
            name={props.name}
            onClick={() => props.callbackFunction(props.value)} />
        </SwitchDiv>
      </KeyDiv>
    </>
  )
}

interface KeySharpProps {
  callbackFunction: (arg0: number) => void;
  name: string;
  value: number;
  index: number;
}

export { KeySharp }
