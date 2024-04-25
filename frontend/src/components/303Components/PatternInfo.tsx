import styled from "styled-components"
import { Pallete303 } from "./Palette"

const InfoDiv = styled.div`
  font-family: 'Androcles';
  height: 156px;
  width: 305px;
  display: flex;
  padding-top: 16px;
  align-items: center;
  justify-content: center;
  flex-direction: column;`

const Text = styled.h4<{$fontSize: number, $textAlign?: boolean}>`
  margin: 0;
  text-align: ${props => props.$textAlign ? "right" : "left"};
  font-size: ${props => props.$fontSize}px;
  width: 206px;`

const Line = styled.div`
  width: 206px;
  height: 2px;
  border-radius: 1px;
  background-color: ${Pallete303.Black};`

const WordSpacing = styled.div`
  display: flex;
  width: 206px;
  justify-content: space-between;`

const PatternInfo = () => {
  return (
    <InfoDiv>
    <Text $fontSize={24} $textAlign>TB-303</Text>
    <Line/>
    <WordSpacing>
      <Text $fontSize={21}>Computer</Text>
      <Text $fontSize={21} $textAlign>Controlled</Text>
    </WordSpacing>
    </InfoDiv>
  )
}

export { PatternInfo }
