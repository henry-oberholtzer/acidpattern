const TextInput = (props: TextInputProps) => {
  return (
    <input 
        type={props.type ? props.type : "text"}
        name={props.name ? props.name : ""}
        onChange={(e) =>  props.state[1](e.target.value)}
        value={props.state[0]}
    >
    </input>
  )
}

interface TextInputProps {
  state: [string, React.Dispatch<React.SetStateAction<string>>] 
  name: string;
  type: string;
}

export { TextInput }
