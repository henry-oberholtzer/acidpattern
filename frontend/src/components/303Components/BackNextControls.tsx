import { BorderContainer, TextContainer, VerticalContainer, Text, Label } from "./303ControlPanel"
import { ButtonTB } from "."
import { PatternContext } from "../../routes/patterns/PatternCreateView"
import { useContext } from "react"

const BackNextControls = () => {
  const { index } = useContext(PatternContext);

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
        onClick={index.back}
      />
    </BorderContainer>
    <BorderContainer>
      <TextContainer>
        <Text>D.S.</Text>
      </TextContainer>
      <ButtonTB
        name="run-stop"
        large={true}
        onClick={index.next}
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
