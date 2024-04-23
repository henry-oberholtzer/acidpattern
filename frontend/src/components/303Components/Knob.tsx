import styled from "styled-components"
import { Pallete303 } from "./Palette"
import SmallKnobBG from "./svgs/small_knob_bg.svg"
import LargeKnobBG from "./svgs/large_knob_bg_1.svg"

const KnobContainer = styled.div<{$large?: boolean}>`
  width: ${props => props.$large? 160 : 80}px;
  height: ${props => props.$large? 156 : 90}px;
  background-image: url(${props => props.$large ? LargeKnobBG : SmallKnobBG});
  display: flex;
  flex-direction: column;
  align-items: center;`

const PotentiometerNotch = styled.div<{$large? : boolean}>`
  width: ${props => props.$large? 90 : 60}px;
  height: ${props => props.$large? 90 : 60}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-image: radial-gradient(farthest-corner at 0px 80px, ${Pallete303.CaseShadow}, ${Pallete303.CaseSilver});
  background-color: ${Pallete303.CaseShadow};
  border: 1px solid ${Pallete303.CaseShadow};`

const PotentiometerCutout = styled.div<{$large? : boolean}>`
  width: ${props => props.$large? 80 : 54}px;
  height: ${props => props.$large? 80 : 54}px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Pallete303.Black};`

const Label = styled.label<{$large? : boolean}>`
  font-family: 'Inter';
  text-transform: uppercase;
  text-align: center;
  user-select: none;
  padding: 0;
  margin: 0;
  font-size: ${props => props.$large? 12 : 10}px;`

const LabelDiv = styled.div<{$large? : boolean}>`
  height: ${props => props.$large? 43 : 20}px;
  display: flex;
  justify-content: center;
  align-items: center;`

const Knob = (props: KnobProps) => {
  return (
    <KnobContainer $large={props.large}>
      <LabelDiv $large={props.large}>
        <Label $large={props.large}>{props.name}</Label>
      </LabelDiv>
      <PotentiometerNotch $large={props.large}>
        <PotentiometerCutout $large={props.large} />
      </PotentiometerNotch>
    </KnobContainer>
  )
}

interface KnobProps {
  large?: boolean
  name?: string;
}

export { Knob }
