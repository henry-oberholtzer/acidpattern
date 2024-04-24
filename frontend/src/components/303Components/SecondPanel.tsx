import styled from "styled-components"
import { Pallete303 } from "./Palette"
import { PatternInfo, Knob } from "."

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
  return (
    <ControlsContainer>
						<Knob
            large={true}
            name={"tempo"}
            min={40}
            max={300}
            steps={260}
            minDeg={30}
            maxDeg={330}
            />
						<Knob large={true}
            name={"track patt.group"}
            min={1}
            max={7}
            steps={8}
            minDeg={30}
            maxDeg={330}
            />
						<Knob large={true}
            name={"mode"}
            min={1}
            max={4}
            steps={4}
            minDeg={210}
            maxDeg={330}
            />
            <PatternInfo />
						<Knob large={true}
            name={"volume"}
            min={0}
            max={127}
            steps={128}
            minDeg={30}
            maxDeg={330}
            />
		</ControlsContainer>
  )
}

export { SecondPanel }
