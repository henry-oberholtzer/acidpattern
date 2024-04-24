import { useContext } from "react";
import { Label, VerticalContainer, LED, ButtonTB, BorderContainer } from "."
import { PatternContext } from "../../routes/patterns/PatternCreateView";

const PitchNormalControls = () => {
  const { mode } = useContext(PatternContext)

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
        onClick={() => mode.set("pitch")}
      />
    </BorderContainer>
    <BorderContainer>
    <LED active={mode.get === "normal"} />
      <ButtonTB
        name="enable-normal-mode"
        onClick={() => mode.set("normal")}
      />
    </BorderContainer>
  </VerticalContainer>
  )
}


export { PitchNormalControls }
