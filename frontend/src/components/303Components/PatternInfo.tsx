import styled from "styled-components"
import { Pallete303 } from "./Palette"

const InfoDiv = styled.div`
  font-family: 'Androcles';
  height: 156px;
  width: 305px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;`

const Text = styled.h4<{$fontSize: number, $textAlign?: boolean}>`
  margin: 0;
  text-align: ${props => props.$textAlign ? "right" : "left"};
  font-size: ${props => props.$fontSize}px;
  text-justify: auto;
  width: 206px;`

const Line = styled.div`
  width: 206px;
  height: 1px;
  border-radius: 1px;
  background-color: ${Pallete303.Black};`

const PatternInfo = () => {
  return (
    <InfoDiv>
    <Text $fontSize={24} $textAlign>TB-303</Text>
    <Line/>
    <Text $fontSize={20}>Computer Controlled</Text>
    </InfoDiv>
  )
}

export { PatternInfo }
