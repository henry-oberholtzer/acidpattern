import { BorderContainer, Key, KeySharp } from "."

const Keyboard = () => {
  return (
    <BorderContainer $width={480} $height={208} $flexRow $filled>
      <Key
        value={36} 
        name={"C"}
        number={1}
      />
      <KeySharp
        index={0}
        name={"C#"}
        value={37} />
      <Key
        value={36} 
        name={"D"}
        number={2}
      />
      <KeySharp
        index={1}
        name={"D#"}
        value={38} />
      <Key
        value={36} 
        name={"E"}
        number={3}
      />
      <Key
        value={36} 
        name={"F"}
        number={4}
      />
      <KeySharp
        index={3}
        name={"F#"}
        value={37} />
      <Key
        value={36} 
        name={"G"}
        number={5}
      />
      <KeySharp
        index={4}
        name={"G#"}
        value={37} />
      <Key
        value={36} 
        name={"A"}
        number={6}
      />
      <KeySharp
        index={5}
        name={"A#"}
        value={37} />
      <Key
        value={36} 
        name={"B"}
        number={7}
      />
      <Key
        value={48} 
        name={"C"}
        number={8}
      />
    </BorderContainer>
  )
}

export { Keyboard }
