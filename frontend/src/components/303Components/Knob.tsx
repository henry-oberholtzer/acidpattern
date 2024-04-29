import styled from "styled-components"
import { Pallete303 } from "./Palette"
import SmallKnobBG from "./svgs/small_knob_bg.svg"
import LargeKnobBG from "./svgs/large_knob_bg_1.svg"
import TestKnobGUISmall from "./svgs/test_knob_gui_small.svg"
import { WheelEvent, useRef, useState } from "react"
import { useCallback } from "react"

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

const Label = styled.label<{$large? : boolean, $left? : boolean, $right? : boolean}>`
  font-family: 'Inter';
  text-transform: uppercase;
  text-align: ${props => props.$left ? "left" : props.$right ? "right" : "center"};
  user-select: none;
  padding: 0;
  margin: 0;
  font-size: ${props => props.$large? 12 : 10}px;`

const LabelDiv = styled.div<{$large? : boolean}>`
  height: ${props => props.$large? 43 : 20}px;
  display: flex;
  justify-content: center;
  align-items: center;`

const BottomLabelDiv = styled.div`
  width: 76%;
  display: flex;
  justify-content: space-between;`

const KnobInput = styled.input<{$large?: boolean, $rotation: number}>`
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
  &:focus {
    outline-color: transparent;
  }
  transform: rotate(${props => props.$rotation - 180}deg );
  &::-webkit-slider-thumb, &::-moz-range-thumb {
    -moz-appearance:none;
    height:0;
    border:none;
  }
`
const Knob = (props: KnobProps) => {
  const [dragFrom, setDragFrom] = useState<DragFrom | null>()
  const knobRef = useRef<HTMLInputElement | null>(null)
  const stepAmount = props.stepAmount ? props.stepAmount : 4;

  const wheelChangeValue = (e: WheelEvent) => {
    if (knobRef.current != null) {
      knobRef.current.focus();
    }
    let newValue = e.deltaY > 0 ? props.state.get - stepAmount : props.state.get + stepAmount;
    if (e.shiftKey || props.steps < 50) {
      newValue = e.deltaY > 0 ? props.state.get - 1 : props.state.get + 1;
    }
    if (props.min <= newValue && newValue <= props.max) {
      props.state.set(newValue)
    }
  }

  const mouseDownChangeValue = (e: React.PointerEvent<HTMLInputElement>) => {
      if (knobRef.current != null) {
        const rect = knobRef.current.getBoundingClientRect()
        const cx = (rect.left + rect.right)*0.5;
        const cy = (rect.top+rect.bottom)*0.5;
        const dx = e.clientX;
        const dy = e.clientY;
        const da = Math.atan2(dx-cx,cy-dy);
        setDragFrom({
          x: dx,
          y: dy,
          a: da,
          v: props.state.get,
        })
      }
    }

  const mouseMoveChangeValue = (e: React.PointerEvent<HTMLInputElement>) => {
    if (knobRef.current != null && dragFrom != null) {
      const dx = e.clientX - dragFrom.x;
      const dy = e.clientY - dragFrom.y;
      const newValue = Math.round((dx/64-dy/128)*(props.max-props.min));
      if (props.min <= newValue && newValue <= props.max) {
        props.state.set(newValue);
      }
    }
  }

  const rotate = () => {
    const step = (props.maxDeg - props.minDeg) / props.steps;
    return props.minDeg + step * (props.state.get - props.min)
  }

  const calcRotation = useCallback(rotate, [props.state.get, rotate])

  return (
    <KnobContainer $large={props.large}>
      <LabelDiv $large={props.large}>
        <Label $large={props.large}>{props.name}</Label>
      </LabelDiv>
      <PotentiometerNotch $large={props.large}>
        <PotentiometerCutout $large={props.large}>
          <KnobInput
            ref={knobRef}
            $large={props.large}
            min={props.min}
            max={props.max}
            $rotation={calcRotation()}
            value={props.state.get}
            type="range"
            onChange={(e) => props.onChange(parseInt(e.target.value))}
            onMouseUp={() => setDragFrom(null)}
            onPointerDown={(e) => mouseDownChangeValue(e)}
            onPointerMove={(e) => mouseMoveChangeValue(e)}
            onDoubleClick={() => props.state.set(Math.floor((props.max - Math.abs(props.min)) / 2))}
            onWheel={wheelChangeValue}
          />
        </PotentiometerCutout>
      </PotentiometerNotch>
      {props.labels ? <BottomLabelDiv>
        <Label $left>{props.labels[0]}</Label>
        <Label>{props.state.get}</Label>
        <Label $right>{props.labels[1]}</Label></BottomLabelDiv> : <Label>{props.state.get}</Label>}
    </KnobContainer>
  )
}

interface KnobProps {
  state: { set: React.Dispatch<React.SetStateAction<number>>, get: number}
  large?: boolean
  name?: string;
  initValue?: number,
  onChange: (arg0: number) => void;
  labels?: [string, string],
  stepAmount?: number,
  min: number;
  max: number;
  steps: number;
  minDeg: number;
  maxDeg: number;
}

interface DragFrom {
  x: number,
  y: number,
  a: number,
  v: number,
}

export { Knob }
