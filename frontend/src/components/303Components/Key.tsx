import styled from "styled-components"
import { ButtonTB, LED } from "."
import { Pallete303 } from "./Palette"
import { useContext, useState } from "react"
import { PatternContext } from "../../routes/patterns/PatternCreateView"

const SharpKeyDiv = styled.div`
  width: 32px;
  height: 104px;
  display: flex;
  margin-top: -104px;
  margin-left: -16px;
  margin-right: -16px;
  z-index: 2;
  flex-direction: column;
  border-radius: 0 0 4px 4px;
  `

const SharpNameLabel = styled.label`
  user-select: none;
  width: 32px;
  height: 15px;
  font-size: 12px;
  background-color: ${Pallete303.Black};
  color: ${Pallete303.ControlPanelColor};
  text-align: center;`

const SharpSwitchDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 88px;
    margin-top: 2px;
    background-color: ${Pallete303.Black};
    border-top: 1px solid ${Pallete303.ControlPanelColor};
    border-radius: 0 0 4px 4px;
    padding: 0 0 15px;`

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
  const { pitchMode, mode, synth, index } = useContext(PatternContext)
  const [ active, setActive ] = useState<boolean>(false)

  const handlePitchInput = () => {
				let newPitch: Pitch;
				if (pitchMode.get[index.current]) {
					const newPitch = {...pitchMode.get[index.current], pitch: props.value}
					const newPitchArray = [...pitchMode.get]
					newPitchArray[index.current] = newPitch;
					pitchMode.set(newPitchArray);
				} else if (pitchMode.get.length < 16) {
					newPitch = {
						index: pitchMode.get.length,
						accent: false,
						slide: false,
						pitch: props.value,
						octave: 0,
					};
					pitchMode.set([...pitchMode.get, newPitch]);
				}
		}

  const onMouseDown = () => {
    setActive(true)
    if (mode.get === "pitch") {
      handlePitchInput()
      if (synth?.current != null) {
        synth.current.attack(props.value)
      }
    }
  }

  const onMouseUp = () => {
    setActive(false)
    if (synth?.current != null) {
      synth.current.release()
    }
    index.next()
  }

  if (props.name[1] === "#") {
    return (
      <SharpKeyDiv>
        <SharpNameLabel htmlFor={props.name}>
          {props.name}
        </SharpNameLabel>
        <SharpSwitchDiv>
          <LED active={active && mode.get === "pitch" || (mode.get === "pitch" && pitchMode.get[index.current]?.pitch === props.value)} />
          <ButtonTB 
            name={props.name}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp} />
        </SharpSwitchDiv>
      </SharpKeyDiv>
    )
  }
  else {
    return (
      <KeyDiv>
        <NameLabel htmlFor={props.name}>{props.name}</NameLabel>
        <SwitchDiv>
          <LED active={active && mode.get === "pitch" || (mode.get === "pitch" && pitchMode.get[index.current]?.pitch === props.value)} />
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
  
}

interface KeysProp {
  sharp?: boolean;
  index?: number;
  value: number;
  name: string;
  number?: number;
}

export { Key }
