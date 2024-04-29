import styled from "styled-components";
import { Pallete303 } from "./Palette";

const BasslineDiv = styled.div`
  width: 254px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;`

const H3 = styled.h3`
  margin: 0;
  padding: 0;
  font-family: 'Aggie Solid';
  font-size: 24px;
  color: ${Pallete303.Black};
  user-select: none;`

const BassLine = () => {
  return (
    <BasslineDiv>
      <H3>bassline</H3>
    </BasslineDiv>
  )
}

export { BassLine }
