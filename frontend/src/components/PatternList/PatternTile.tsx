import styled from "styled-components";
import { Pallete303 } from "../303Components/Palette";

const PatternFrame = styled.div`
  width: 360px;
  height: 155px;
  padding: 5px;
  background-color: ${Pallete303.CaseSilver};
  border-radius: 3px;`

const PatternTile = (props: PatternTileProps) => {
  const { pattern } = props
  return (
    <PatternFrame>
      {pattern.name}
    </PatternFrame>
  )
}

interface PatternTileProps {
  pattern: Pattern;
}

export { PatternTile }
