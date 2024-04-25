import styled from "styled-components";
import { Pallete303 } from "./Palette";
import { WaveformSwitch } from "./WaveformSwitch";

const AcidPatternDiv = styled.div`
  width: 315px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;`

const H3 = styled.h3`
  margin: 0;
  padding: 0;
  font-family: 'Aggie Solid';
  font-size: 24px;
  color: ${Pallete303.Black};
  user-select: none;`

const SwitchPadding = styled.div`
  height: 22px;
  width: 100%;`

const AcidPattern = () => {
  return (
    <AcidPatternDiv>
      <WaveformSwitch />
      <H3>acidpattern</H3>
      <SwitchPadding />
    </AcidPatternDiv>
  )
}

export { AcidPattern }
