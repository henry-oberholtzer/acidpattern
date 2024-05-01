import styled from "styled-components";
import { PatternTable } from "./PatternTable";
import { Pallete303 } from "./Palette";
import { useContext, useEffect, useState } from "react";
import { PatternContext } from "../../routes";
import { useAuth } from "../../hooks/useAuth";

const Container = styled.div`
  width: 625px;
  height: 136px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: '5x7 Pixel';
  display: flex;
  flex-direction: column;
  color: ${Pallete303.LCDFont};
  border-top: 3px solid ${Pallete303.CaseShadow};
  border-bottom: 3px solid ${Pallete303.CaseHighlight};
  border-left: 3px solid ${Pallete303.ButtonRight};
  border-right: 3px solid ${Pallete303.ButtonLeft};
  background-color: ${Pallete303.LCDBackground};
  background-image: ${Pallete303.LCDBackgroundGradient};
  padding: 5px;`

const NameInputLabel = styled.label`
  height: 18px;
  width: 110px;
  padding-left: 4px;
  font-size: 16px;
  background-color: ${Pallete303.LCDFont};
  color: ${Pallete303.LCDBackground};`

const NameInput = styled.input`
  font-family: '5x7 Pixel';
  width: ${8*30}px;
  height: 18px;
  font-size: 16px;
  background-color: transparent;
  border: none;
  padding: 0;
  padding-left: 4px;
  cursor: pointer;
  &:focus, &:active {
    outline: 2px solid ${Pallete303.LCDFont};
  }
  `

const NameInputGroup = styled.div`
  height: 18px;
  display: flex;
  margin-bottom: 2px;`

const SaveAndPostButton = styled.button`
  height: 18px;
  margin-bottom: 2px;
  font-family: '5x7 Pixel';
  font-size: 16px;
  width: ${8 * 30}px;
  cursor: pointer;
  background-color: ${Pallete303.LCDFont};
  color: ${Pallete303.LCDBackground};
  border: none;
  &:focus, &:active, &:hover {
    outline: 2px solid ${Pallete303.LCDFont};
    background-color: transparent;
    color: ${Pallete303.LCDFont};
  }
  &:disabled {
    opacity: 0.5;
  }`

const PatternInfo = () => {
  const { user } = useAuth()
  const { pitchMode, timeMode, sections, name } = useContext(PatternContext)
  const [disabled, setDisabled] = useState<boolean>(false)



  useEffect(() => {
    if (pitchMode.get.length > 1 && timeMode.get.length > 1 && name.get.length > 3) {
      setDisabled(false)
    } else if (sections.get[0].time_mode.length > 1 && sections.get[0].pitch_mode.length > 1 && name.get.length > 3) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [pitchMode, timeMode, sections, name])

  const handlePatternPost = () => {

  }

  return (
    <Container>
      <NameInputGroup>
        <NameInputLabel>PATTERN NAME:</NameInputLabel>
        <NameInput 
          placeholder={"CLICK TO ADD NAME"}/>
          {user?.user &&
            <SaveAndPostButton onClick={handlePatternPost} disabled={disabled}>SAVE & POST THIS PATTERN</SaveAndPostButton>
          }
          {!user && 
            <SaveAndPostButton>AN ACCOUNT IS REQUIRED TO POST</SaveAndPostButton>
          }
      </NameInputGroup>
      <PatternTable />
    </Container>
  )
}

export { PatternInfo } 
