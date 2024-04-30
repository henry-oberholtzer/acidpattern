import styled from "styled-components";
import { Pallete303 } from "./303Components/Palette";

const Input = styled.input`
  font-size: 16px;
  font-family: 'Inter';
  padding: 6px;
  `

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;`

const Label = styled.label<{ $hideLabel?: boolean }>`
  font-size: 16px;
  ${props => props.$hideLabel ? "visibility: hidden;" : ""}
  color: ${Pallete303.Black};
  border-bottom: 2px solid ${Pallete303.Black};
  margin-bottom: 5px;`

const TextInput = (props: TextInputProps) => {
  return (
    <InputGroup>
    <Label htmlFor={props.name} $hideLabel={props.hideLabel}>{props.label}</Label>
    <Input
        type={props.type ? props.type : "text"}
        name={props.name ? props.name : ""}
        placeholder={props.placeholder}
        onChange={(e) =>  props.state[1](e.target.value)}
        value={props.state[0]}
    >
    </Input>
    </InputGroup>
  )
}

interface TextInputProps {
  state: [string, React.Dispatch<React.SetStateAction<string>>] 
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  hideLabel?: boolean;
}

export { TextInput }
