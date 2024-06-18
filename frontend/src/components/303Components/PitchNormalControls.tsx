import { Label, VerticalContainer, LED, ButtonTB, BorderContainer, Text } from "."
import { Pallete303 } from "./Palette";
import styled from "styled-components";
import { usePattern } from "../../hooks";

const FunctionButtonArea = styled.div<{ $height: number, $alignTop?: boolean, $justifyTop?: boolean, $column?: boolean}>`
  width: 100%;
  height: ${props => props.$height}px;
  display: flex;
  flex-direction: ${props => props.$column? "column" : "row"};
  align-items: ${props => props.$alignTop? "start" : "center"};
  justify-content: ${props => props.$justifyTop? "start" : "center"};
  `

const PatternLabelDiv = styled.div`
  width: 52px;
  height: 53px;
  display: flex;
  align-items: start;
  justify-content: end;
  border-left: 1px solid ${Pallete303.Black};
  border-bottom: 1px solid ${Pallete303.Black};
  border-radius: 0 0 0 10px;`

const PatternInsetDiv = styled.div`
  width: 49px;
  height: 50px;
  display: flex;
  align-items: end;
  justify-content: end;
  background-color: ${Pallete303.Black};
  border-radius: 0 0 0 8px;`

const LabelDiv = styled.div`
  margin-right: -10px;
  z-index: 3;
  width: 50px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Pallete303.Black};`

const Pattern = styled.p`
  font-size: 10px;
  color: ${Pallete303.LEDRedActive};`

const PitchNormalControls = () => {
  const { mode, pitchMode, activeIndex } = usePattern();

  const handlePitchMode = () => {
    mode.set("pitch")
    if (pitchMode.get.length > 0) {
      activeIndex.set(-1)
    } else {
      activeIndex.set(0)
    }
  }

  return (
    <VerticalContainer>
    <BorderContainer
      $small
      $filled>
        <Label
          htmlFor="enable-pitch-mode"
          $silver
          $height={16}>
          PITCH MODE
        </Label>
      <LED active={mode.get === "pitch"} />
      <ButtonTB
        horizontal={true}
        name="enable-pitch-mode"
        onClick={handlePitchMode}
      />
    </BorderContainer>
    <BorderContainer>
      <FunctionButtonArea $height={24}>
        <Text $noBorder>FUNCTION</Text>
        <LED active={mode.get === "normal"} />
      </FunctionButtonArea>
      <FunctionButtonArea $height={102}>
        <FunctionButtonArea $height={102} $alignTop>
        <ButtonTB
          name="enable-normal-mode"
          onClick={() => mode.set("normal")}
        />
        </FunctionButtonArea>
        <FunctionButtonArea $height={102} $justifyTop $column>
          <Label
            $small
            $height={28}
            htmlFor="enable-normal-mode">
              Normal Mode
          </Label>
          <PatternLabelDiv>
            <PatternInsetDiv>
              <LabelDiv>
                <Pattern>
                  PATTERN
                </Pattern>
              </LabelDiv>
            </PatternInsetDiv>
          </PatternLabelDiv>
        </FunctionButtonArea>
      </FunctionButtonArea>



    </BorderContainer>
  </VerticalContainer>
  )
}


export { PitchNormalControls }
