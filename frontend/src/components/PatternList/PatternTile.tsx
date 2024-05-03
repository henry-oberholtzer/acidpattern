import styled from "styled-components";
import { Pallete303 } from "../303Components/Palette";
import { formatDistance } from "date-fns";

const PatternFrame = styled.div`
  width: 360px;
  height: 155px;
  padding: 5px;
  background-color: ${Pallete303.CaseSilver};
  border-radius: 3px;`

const PatternTitle = styled.h3`
  width: 350px;
  font-family: 'Inter';
  font-size: 16px;
  
  margin: 2px 0px;
  `

const PatternInfo = styled.div`
  width: 350px;
  font-size: 12px;
  height: 20px;
  align-items: center;
  display: flex;`

const PatternFooter = styled.div`
  width: 350px;
  font-size: 12px;
  display: flex;`

const SectionTile = styled.div<{ $filled: boolean }>`
  width: 16px;
  height: 16px;
  margin: 2px;
  border: 2px solid black;
  ${props => props.$filled ? `color: ${Pallete303.CaseSilver};` : ""}
  ${props => props.$filled ? `background-color: ${Pallete303.Black};` : ""}`

const PatternTile = (props: PatternTileProps) => {
  const { pattern } = props

  const getSections = (sections: Section[]) => {
    const presentSections: [string, boolean][] = []
    sections.forEach((s) => {
      if (s.pitch_mode.length > 0 && s.time_mode.length > 0) {
        presentSections.push([s.name, true])
      } else {
        presentSections.push([s.name, false])
      }
    })
    return presentSections
  }

  return (
    <PatternFrame>
      <PatternTitle>
        {pattern.name}
      </PatternTitle>
      <PatternInfo>{pattern.settings.tempo}bpm | {getSections(pattern.sections).map((s) => {
        return (
          <SectionTile $filled={s[1]}>{s[0]}</SectionTile>
        )
      })} {pattern.author} | </PatternInfo>
      <PatternFooter>
      {pattern.date ? formatDistance(new Date(pattern.date), Date.now(), { addSuffix: true }) : ""} 
      </PatternFooter>
    </PatternFrame>
  )
}

interface PatternTileProps {
  pattern: Pattern;
}

export { PatternTile }
