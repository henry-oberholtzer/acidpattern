import styled from "styled-components"
import { BackNextControls, ClearRunControls, Keyboard, PitchNormalControls, TimeModeControls } from "."
import { Pallete303 } from "./Palette"

const ControlPanelFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
  width: 1080px;
  background-color: ${Pallete303.CaseSilver};
  border: 3px solid ${Pallete303.CaseHighlight};
  border-left: 3px solid ${Pallete303.CaseShadow};
  border-bottom: 3px solid ${Pallete303.CaseShadow};
  border-radius: 3px;`

const ControlPanelInnerFrame = styled.div`
  display: flex;
  height: 224px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${Pallete303.CaseShadow};
  border-radius: 2px;
  border-bottom: 2px solid ${Pallete303.CaseHighlight};
  background-color: ${Pallete303.ControlPanelColor};
  width: 1064px;`

const ControlPanel = () => {
  return (
    <ControlPanelFrame>
    <ControlPanelInnerFrame>
      <ClearRunControls />
      <PitchNormalControls />
      <Keyboard />
      <TimeModeControls />
      <BackNextControls />
    </ControlPanelInnerFrame>
  </ControlPanelFrame>
  )
}

export { ControlPanel }
