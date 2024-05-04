import styled from "styled-components"
import { Knob } from "./Knob"
import { Pallete303 } from "./Palette"
import { BassLine } from "./BassLine"
import { AcidPattern } from "./AcidPattern"
import { usePattern } from "../../hooks"


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
  const { tuning, cutoff, resonance, envMod, decay, accent, synth } = usePattern()

  const adjustCutoff = (value: number) => synth?.current != null ? 
      synth.current.setCutoff(value) : null

  const adjustTuning = (value: number) => synth?.current != null ? 
    synth.current.setTuning(value) : null

  const adjustEnvMod = (value: number) => synth?.current != null ? 
    synth.current.setEnvMod(value) : null
  
  const adjustResonance = (value: number) => synth?.current != null ? 
    synth.current.setResonance(value) : null

  const adjustDecay = (value: number) => synth?.current != null ? 
    synth.current.setDecay(value) : null
  
  const adjustAccent = (value: number) => synth?.current != null ? 
    synth.current.setAccent(value) : null
  
  
  return (
    <FirstPanelContainer>
      <AcidPattern />
      <LineDivider/>
      <Knob
        name={"tuning"}
        state={tuning}
        onChange={adjustTuning}
        min={-500}
        max={500}
        steps={1000}
        stepAmount={100}
        minDeg={30}
        maxDeg={330}
      />
      <Knob
        name={"cut off freq"}
        onChange={adjustCutoff}
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
        onChange={adjustResonance}
        min={0}
        max={127}
        steps={128}
        minDeg={30}
        maxDeg={330}
      />
      <Knob
        name={"env mod"}
        state={envMod}
        onChange={adjustEnvMod}
        min={0}
        max={127}
        steps={128}
        minDeg={30}
        maxDeg={330}
      />
      <Knob
        name={"decay"}
        state={decay}
        onChange={adjustDecay}
        min={0}
        max={127}
        steps={128}
        minDeg={30}
        maxDeg={330}
        />
      <Knob
        name={"accent"}
        state={accent}
        onChange={adjustAccent}
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
