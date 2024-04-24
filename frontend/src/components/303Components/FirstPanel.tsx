import styled from "styled-components"
import { Knob } from "./Knob"
import { Pallete303 } from "./Palette"
import { BassLine } from "./BassLine"
import { AcidPattern } from "./AcidPattern"

const FirstPanelContainer = styled.div`
  height: 96px;
  width: 1080px;
  display: flex;
  background-color: ${Pallete303.CaseSilver};
  border: 3px solid ${Pallete303.ControlPanelColor};
  border-top: 3px solid ${Pallete303.CaseHighlight};
  border-bottom: 3px solid ${Pallete303.CaseShadow};
  border-radius: 5px 5px 2px 2px;`

const LineDivider = styled.div`
  height: 78px;
  border-left: 2px solid ${Pallete303.Black};
  margin: 6px;`


const FirstPanel = () => {
  return (
    <FirstPanelContainer>
      <AcidPattern />
      <LineDivider/>
      <Knob
        name={"tuning"}
        min={-500}
        max={500}
      />
      <Knob
        name={"cut off freq"}
        min={0}
        max={127}
      />
      <Knob
        name={"resonance"}
        min={0}
        max={127}
      />
      <Knob
        name={"env mod"}
        min={0}
        max={127}
      />
      <Knob
        name={"decay"}
        min={0}
        max={127}
        />
      <Knob
        name={"accent"}
        min={0}
        max={127}
      />
      <LineDivider/>
      <BassLine />
    </FirstPanelContainer>
  )
}

export { FirstPanel }
