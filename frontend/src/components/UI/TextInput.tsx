import styled from "styled-components";
import { Pallete303 } from "../303Components/Palette";

const Input = styled.input<{ $valid?: boolean, $validate?: boolean, $width?: number, $textCenter?: boolean}>`
  font-size: 16px;
  font-family: 'Inter';
  padding: 6px;
  ${props => props.$textCenter ? "text-align: center;" : ""}
  ${props => props.$width ? "width: " + props.$width + "px;" : ""}
  ${props => props.$validate ? `
  &:focus {
    outline: 2px solid ${props.$valid ? "#22FF22" : "#FF2222" };
  }
  ` : ""}
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
        $validate={props.validator ? true : false}
        $valid={props.validator ? props.validator[0] : false}
        onChange={(e) =>  { 
          props.state[1](e.target.value); 
          if (props.validator) {
            props.validator[1](e.target.value)
          }
        }}
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
  validator?: [boolean, (arg0: string) => void] 
}

export { TextInput, Input, Label, InputGroup }
