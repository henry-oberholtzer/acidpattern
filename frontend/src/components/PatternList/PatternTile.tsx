import styled from "styled-components";
import { Pallete303 } from "../303Components/Palette";
import { formatDate } from "date-fns";
import { LCDButton } from "../303Components";

const PatternFrame = styled.div`
  width: ${12*30 + 40}px;
  height: ${20*8}px;
  font-family: '5x7 Pixel';
  font-size: 14px;
  padding: 20px 20px 0px 20px;
  background-color: ${Pallete303.LCDBackground};
  color: ${Pallete303.LCDFont};`

const PatternTitle = styled.h3`
  width: !00%;
  font-size: 14px;
  font-weight: normal;
  background-color: ${Pallete303.LCDFont};
  color: ${Pallete303.LCDBackground};
  border-bottom: 2px solid ${Pallete303.LCDFont};
  padding: 2px;
  margin: 0px 0px 2px 0px;
  `

const PatternInfo = styled.p`
  width: 100%;
  font-size: 14px;
  height: 20px;
  padding: 2px;
  margin: 0px 0px 4px 0px;`

const PatternFooter = styled.div`
width: 100%;
font-size: 14px;
height: 20px;
padding: 2px;
margin: 0px 0px 4px 0px;`

const PatternTile = (props: PatternTileProps) => {
  const { pattern } = props

  return (
    <PatternFrame>
      <PatternTitle>
        {pattern.name}
      </PatternTitle>
      <PatternInfo>{pattern.settings.tempo > 99 ? pattern.settings.tempo : '0' + pattern.settings.tempo }bpm,</PatternInfo>
      <PatternFooter>
      {pattern.author ? `by ${pattern.author}, ` : ""}{pattern.date ? formatDate(new Date(pattern.date), "MM-dd-yyyy") : ""}
      </PatternFooter>
      <PatternFooter>{'-'.repeat(30)}</PatternFooter>
      <LCDButton $width={5*12}>PLAY</LCDButton> <LCDButton $width={9*12}>DOWNLOAD</LCDButton> <LCDButton $width={5*12}>LIKE</LCDButton>
      <PatternFooter>{'-'.repeat(30)}</PatternFooter>
    </PatternFrame>
  )
}

interface PatternTileProps {
  pattern: Pattern;
}

export { PatternTile }
