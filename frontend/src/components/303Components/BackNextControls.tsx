import { BorderContainer, TextContainer, VerticalContainer, Text, Label } from "./303ControlPanel"
import { ButtonTB } from "."
import { PatternContext } from "../../routes/patterns/PatternCreateView"
import { useContext } from "react"

const BackNextControls = () => {
  const { index, synth, pitchMode, mode } = useContext(PatternContext);

  const onMouseDown = (back: boolean = false) => {
    console.log("Previous: ", index.current)
    if (back === false) {
      index.back()
      if (synth?.current != null && mode.get === "pitch" && pitchMode.get[index.current - 1]) {
        synth.current.attack(pitchMode.get[index.current - 1].pitch)
      }
    } else {
      index.next()
      if (synth?.current != null && mode.get === "pitch" && pitchMode.get[index.current + 1]) {
        synth.current.attack(pitchMode.get[index.current + 1].pitch)
      }
    }

  }

  const onMouseUp = () => {
    if (synth?.current != null) {
      synth.current.release()
    }
  }

  return (
    <VerticalContainer>
    <BorderContainer $small>
      <TextContainer>
        <Text
          $padding={0}
          $fontSize={12}>
          {'\u{1D10B}'}
        </Text>
      </TextContainer>
      <Label
        htmlFor="back"
        $small>
        BACK
      </Label>
      <ButtonTB
        name="back"
        horizontal={true}
        onMouseDown={() => onMouseDown(true)}
        onMouseUp={onMouseUp}
      />
    </BorderContainer>
    <BorderContainer>
      <TextContainer>
        <Text>D.S.</Text>
      </TextContainer>
      <ButtonTB
        name="run-stop"
        large={true}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
      <Label
        $extraMargin
        $border>
        Write / Next
      </Label>
      <Text $noBorder $fontSize={10}>Tap</Text>
    </BorderContainer>
  </VerticalContainer>
  )
}

export { BackNextControls }
