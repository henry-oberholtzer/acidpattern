import styled from "styled-components"

const InfoDiv = styled.div`
  font-family: 'Androcles';
  height: 156px;
  width: 305px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;`

const PatternInfo = () => {
  return (
    <InfoDiv>
    <p>TB-303</p>
    <p>Computer Controlled</p>
    </InfoDiv>
  )
}

export { PatternInfo }
