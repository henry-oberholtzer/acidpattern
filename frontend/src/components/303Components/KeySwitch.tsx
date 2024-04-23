import { LED } from "."
import { ButtonTB } from "."

const SwitchDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: end;
align-items: center;
width: 100%;
height: 148px;
border-radius: 0 0 4px 4px;
border: 1px solid ${Pallete303.Black};
padding: 6px;`

const KeySwitch = (props: KeySwitchProps) => {

  const handleMouseDown = () => {
    // Set LED to active
  }

  const handleMouseUp = () => {
    // Set LED to inactive
  }

  return (
    <SwitchDiv>
        <LED />
        <ButtonTB name={props.name} 
        onClick={() => props.callbackFunction(props.value)}/>
    </SwitchDiv>
  )
}

interface KeySwitchProps {
  value: number;
  name: string;
  onClick: () => void;
}
