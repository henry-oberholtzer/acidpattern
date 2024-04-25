import styled from "styled-components"
import { Knob } from "./Knob"
import { Pallete303 } from "./Palette"
import { BassLine } from "./BassLine"
import { AcidPattern } from "./AcidPattern"
import { PatternContext } from "../../routes/patterns/PatternCreateView"
import { useContext } from "react"

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
  const { tuning, cutoff, resonance, envMod, decay, accent } = useContext(PatternContext)

  return (
    <FirstPanelContainer>
      <AcidPattern />
      <LineDivider/>
      <Knob
        name={"tuning"}
        state={tuning}
        min={0}
        max={100}
        steps={100}
        minDeg={30}
        maxDeg={330}
      />
      <Knob
        name={"cut off freq"}
        state={cutoff}
        min={0}
        max={127}
        steps={128}
        minDeg={30}
        maxDeg={330}
      />
      <Knob
        name={"resonance"}
        state={resonance}
        min={0}
        max={127}
        steps={128}
        minDeg={30}
        maxDeg={330}
      />
      <Knob
        name={"env mod"}
        state={envMod}
        min={0}
        max={127}
        steps={128}
        minDeg={30}
        maxDeg={330}
      />
      <Knob
        name={"decay"}
        state={decay}
        min={0}
        max={127}
        steps={128}
        minDeg={30}
        maxDeg={330}
        />
      <Knob
        name={"accent"}
        state={accent}
        min={0}
        max={127}
        steps={128}
        minDeg={30}
        maxDeg={330}
      />
      <LineDivider/>
      <BassLine />
    </FirstPanelContainer>
  )
}

export { FirstPanel }
