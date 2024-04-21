import { useState } from "react"
import { TextInput } from "../../components/TextInput"


const PatternCreateView = (props: PatternCreateProps) => {
  const [name, setName] = useState(props.pattern.name)

  return (
    <>
      <TextInput
        state={[name, setName]}
      />
      <p>This is where a user will create the patterns.</p>
    </>
  )
}

interface PatternCreateProps {
  pattern: Pattern
}

export { PatternCreateView }
