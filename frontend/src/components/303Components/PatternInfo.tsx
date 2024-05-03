import styled from "styled-components";
import { PatternTable } from "./PatternTable";
import { Pallete303 } from "./Palette";
import { useContext, useState } from "react";
import { PatternClearModal } from "./PatternClearModal";
import { usePattern, useAuth } from "../../hooks";
import { api } from "../../scripts/api";
import { PatternClearModalContext } from "../../routes";

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

const NameInputLabel = styled.label`
  height: 20px;
  width: ${121}px;
  font-size: 14px;
  padding: 2px;
  background-color: ${Pallete303.LCDFont};
  color: ${Pallete303.LCDBackground};`

const NameInput = styled.input`
  font-family: '5x7 Pixel';
  width: ${30*8}px;
  height: 20px;
  font-size: 14px;
  background-color: transparent;
  border: none;
  padding-left: 6px;
  cursor: pointer;
  &:focus, &:active {
    outline: 2px solid ${Pallete303.LCDFont};
  }
  `

const NameInputGroup = styled.div`
  height: 20px;
  display: flex;
  margin-bottom: 2px;`

const LCDButton = styled.button<{ $width?: number }>`
  height: 20px;
  font-family: '5x7 Pixel';
  font-size: 14px;
  width: ${props => props.$width ? props.$width :  8 * 10}px;
  cursor: pointer;
  background-color: ${Pallete303.LCDFont};
  color: ${Pallete303.LCDBackground};
  border: none;
  outline: 2px solid transparent;
  transition: outline 50ms;
  &:focus, &:active {
    outline: 2px solid ${Pallete303.LCDFont};
  }
  &:hover {
    background-color: ${Pallete303.LCDFont}DD;
  }`

const PatternInfo = () => {
  const { user } = useAuth()
  const patternClearModal = useContext(PatternClearModalContext)
  const { pitchMode, timeMode, name, activeSection, patternObject} = usePattern()
  const [ saveMessage, setSaveMessage ] = useState<string>("POST")

  const postPattern = async () => {
		if (user != null) {
			const pattern = patternObject()
			const header = {
				'Content-Type': 'application/json', 
				'Authorization': `Token ${user.token}`
			}
			const response = await api.postPattern(header, pattern)
			return response
		}
	}

  const handlePatternPost = () => {
      if (!(activeSection.get === 'A' && pitchMode.get.length > 1 && timeMode.get.length > 1)) {
        setSaveMessage("pattern is empty!")
        setTimeout(() => {
          setSaveMessage("POST")
        }, 3000)
      }
      else if (name.get.trim().length <= 0 ) {
        setSaveMessage("name required!")
        setTimeout(() => {
          setSaveMessage("POST")
        }, 3000)
      } else {
        postPattern()
        setSaveMessage("posted!")
      }
  }

  

  if (patternClearModal) {
    return (
      <LCDContainer $width={625} $height={136}>
        <PatternClearModal />
      </LCDContainer>
    )
  }

  return (
    <LCDContainer $width={625} $height={136}>
      <NameInputGroup>
        <NameInputLabel>PATTERN :</NameInputLabel>
        <NameInput
          maxLength={30} 
          placeholder={"CLICK TO ADD NAME"}
          value={name.get}
          onChange={(e) => name.set(e.target.value)}/>
          {user?.user &&
            <LCDButton $width={8*30} onClick={handlePatternPost}>{saveMessage}</LCDButton>
          }
          {!user && 
            <LCDButton $width={8*30} >Login To Post</LCDButton>
          }
      </NameInputGroup>
      <PatternTable />
    </LCDContainer>
  )
}

export { PatternInfo, LCDButton } 
