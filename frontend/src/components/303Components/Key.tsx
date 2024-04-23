import styled from "styled-components"
import { ButtonTB, LED } from "."
import { Pallete303 } from "./Palette"
import { useContext, useState } from "react"
import { PatternContext } from "../../routes/patterns/PatternCreateView"

const KeyDiv = styled.div`
  width: 60px;
  height: 208px;
  display: flex;
  flex-direction: column;
  background-color: ${Pallete303.ControlPanelColor};
  `

const NameLabel = styled.label`
  width: 60px;
  height: 16px;
  font-size: 12px;
  background-color: ${Pallete303.Black};
  color: ${Pallete303.ControlPanelColor};
  text-align: center;
  user-select: none;`

  const SwitchDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 148px;
    border-radius: 0 0 4px 4px;
    border: 1px solid ${Pallete303.Black};
    padding: 6px;`

const Decor = styled.div`
  background-color: ${Pallete303.Black};
  color: ${Pallete303.LEDRedActive};
  width: 100%;
  font-size: 10px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;`

const SmallerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  height: 20px;
  font-size: 10px;
  border-top: 1px solid ${Pallete303.Black};
  `

const HighlightP = styled.div`
  width: 22px;
  height: 14px;
  font-size: 10px;
  background-color: ${Pallete303.Black};
  color: ${Pallete303.ControlPanelColor};
  text-align: center;
  user-select: none;`

const Key = (props: KeysProp) => {
  const { activeIndex, pitchMode, mode, handlePitchInput, advanceIndex } = useContext(PatternContext)
  const [ active, setActive ] = useState<boolean>(false)

  const onMouseDown = () => {
    setActive(true)
    if (mode === "pitch") {
      handlePitchInput(props.value)
    }
  }

  const onMouseUp = () => {
    setActive(false)
    advanceIndex()
  }

  return (
    <KeyDiv>
      <NameLabel htmlFor={props.name}>{props.name}</NameLabel>
      <SwitchDiv>
        <LED active={active && mode === "pitch" || (mode === "pitch" && pitchMode[activeIndex]?.pitch === props.value)} />
        <ButtonTB name={props.name}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp} />
      </SwitchDiv>
      <Decor>{props.number}</Decor>
      <SmallerDiv>
        <HighlightP>
          {props.number}
        </HighlightP>
      </SmallerDiv>
    </KeyDiv>
  )
}

interface KeysProp {
  sharp?: boolean;
  callbackFunction: (arg0: number) => void;
  value: number;
  name: string;
  number: number;
}

export { Key }
