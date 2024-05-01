import styled from "styled-components"
import { Pallete303 } from "./Palette"
import { ModelName, Knob, PatternInfo } from "."
import { PatternContext } from "../../routes/patterns/PatternCreateView"
import { useContext } from "react"

const ControlsContainer = styled.div`
  height: 162px;
  width: 1080px;
  border-radius: 3px;
  display: flex;
  padding-left: 70px;
  background-color: ${Pallete303.CaseSilver};
  border: 3px solid ${Pallete303.ControlPanelColor};
  border-top: 3px solid ${Pallete303.CaseHighlight};
  border-bottom: 3px solid ${Pallete303.CaseShadow};  
  `

const SecondPanel = () => {
  const { volume, tempo, synth } = useContext(PatternContext)

  const adjustVolume = (value: number) => synth?.current != null ? 
      synth.current.setVolume(value) : null

  const adjustTempo = (value: number) => synth?.current != null ? 
      synth.current.setTempo(value) : null

  return (
    <ControlsContainer>
						<Knob
            large={true}
            name={"tempo"}
            labels={["slow", "fast"]}
            onChange={adjustTempo}
            state={tempo}
            min={40}
            max={300}
            steps={260}
            minDeg={30}
            maxDeg={330}
            />
						<PatternInfo />
						<Knob large={true}
            name={"volume"}
            onChange={adjustVolume}
            state={volume}
            min={0}
            max={127}
            steps={128}
            minDeg={30}
            maxDeg={330}
            labels={["off", "max"]}
            />
		</ControlsContainer>
  )
}

export { SecondPanel }
