import styled from "styled-components"
import { Pallete303 } from "./Palette"
import SmallKnobBG from "./svgs/small_knob_bg.svg"
import LargeKnobBG from "./svgs/large_knob_bg_1.svg"
import TestKnobGUISmall from "./svgs/test_knob_gui_small.svg"
import { WheelEvent, useState } from "react"

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

const KnobInput = styled.input<{$large?: boolean, rotation: number}>`
  width: ${props => props.$large? 74 : 50}px;
  height: ${props => props.$large? 74 : 50}px;
  cursor: pointer;
  -webkit-appearance:none;
  -moz-appearance:none;
  border:none;
  margin: 0;
  box-sizing:border-box;
  overflow:hidden;
  background-image: url(${TestKnobGUISmall});
  background-repeat:no-repeat;
  background-size:100% 100%;
  background-position:0px 0%;
  background-color:transparent;
  touch-action:none;
  transform: rotate(${props => props.rotation}deg);
  &::-webkit-slider-thumb, &::-moz-range-thumb {
    -moz-appearance:none;
    height:0;
    border:none;
  }
`
const Knob = (props: KnobProps) => {
  const [value, setValue] = useState<number>(63)

  const changeValue = (e: WheelEvent) => {
    const newValue = e.deltaY > 0 ? value - 1 : value + 1;
    if (props.min <= newValue && newValue <= props.max) {
      setValue(newValue)
    }
  }

  const getRotation = () => Math.round((value / (props.min + props.max)) * 360)

  return (
    <KnobContainer $large={props.large}>
      <LabelDiv $large={props.large}>
        <Label $large={props.large}>{props.name}</Label>
      </LabelDiv>
      <PotentiometerNotch $large={props.large}>
        <PotentiometerCutout $large={props.large}>
          <KnobInput 
            $large={props.large}
            min={props.min}
            max={props.max}
            rotation={Math.round((value / (props.min + props.max)) * 360)}
            value={value}
            type="range"
            onChange={() => setValue(Math.floor((props.max - props.min) / 2))}
            onWheel={changeValue}
          />
        </PotentiometerCutout>
      </PotentiometerNotch>
      <Label>{value}</Label>
    </KnobContainer>
  )
}

interface KnobProps {
  large?: boolean
  name?: string;
  min: number;
  max: number;
}

export { Knob }
