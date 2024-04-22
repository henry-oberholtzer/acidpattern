import { Label, VerticalContainer, LED, ButtonTB, BorderContainer } from "."

const PitchNormalControls = (props: PitchModeControlsProps) => {
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
      <LED active={props.mode === "pitch"} />
      <ButtonTB
        horizontal={true}
        name="enable-pitch-mode"
        onClick={() => props.setMode("pitch")}
      />
    </BorderContainer>
    <BorderContainer>
    <LED active={props.mode === "normal"} />
      <ButtonTB
        name="enable-normal-mode"
        onClick={() => props.setMode("normal")}
      />
    </BorderContainer>
  </VerticalContainer>
  )
}

interface PitchModeControlsProps {
  setMode: (value: "time" | "pitch" | "normal") => void;
  mode: "time" | "pitch" | "normal";
}

export { PitchNormalControls }
