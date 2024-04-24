import styled from "styled-components"
import { Pallete303 } from "./Palette"
import { TextInput } from "../TextInput"
import { PatternContext } from "../../routes/patterns/PatternCreateView"
import { useContext } from "react"

const Container = styled.div`
  width: 1080px;
  height: 150px;
  background-color: white;
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 6px;
  box-shadow: 3px 3px 30px ${Pallete303.CaseShadow}, -3px -3px 30px ${Pallete303.CaseShadow};`

const PatternInfo = styled.div`
  width: 315px;
  height: 138px;
  background-color: black;`

const PatternForm = () => {
  const { name, setName } = useContext(PatternContext);

  return (
    <Container>
      <PatternInfo>
        <TextInput
          state={[name, setName]}
          name={"Pattern Name"}
          type="string"/>
      </PatternInfo>
    </Container>
  )
}

export { PatternForm }
