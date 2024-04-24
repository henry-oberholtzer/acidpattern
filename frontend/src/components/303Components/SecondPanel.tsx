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
            max={300} />
						<Knob large={true}
            name={"track patt.group"}
            min={1}
            max={7} />
						<Knob large={true}
            name={"mode"}
            min={1}
            max={4} />
            <PatternInfo />
						<Knob large={true}
            name={"volume"}
            min={0}
            max={127} />
		</ControlsContainer>
  )
}

export { SecondPanel }
