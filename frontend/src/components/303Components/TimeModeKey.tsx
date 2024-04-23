import styled from 'styled-components';
import { ButtonTB, LED } from '.';
import { Pallete303 } from './Palette';

const Group = styled.div`
	width: 240px;
	height: 152px;
	display: flex;
`;

const KeyDiv = styled.div`
	width: 61px;
	height: 152px;
	display: flex;
	margin-right: -1px;
	flex-direction: column;
	background-color: ${Pallete303.ControlPanelColor};
`;

const NameLabel = styled.label`
	width: 60px;
	height: 24px;
	font-size: 12px;
	background-color: ${Pallete303.Black};
	color: ${Pallete303.ControlPanelColor};
	text-align: center;
	user-select: none;
`;

const SwitchDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: center;
	width: 100%;
	height: 84px;
	border-radius: 0 0 4px 4px;
	border: 1px solid ${Pallete303.Black};
	margin: -1px;
	padding: 4px 6px 6px 6px;
`;

const Decor = styled.div`
	background-color: ${Pallete303.Black};
	color: ${Pallete303.LEDRedActive};
	width: 60px;
	font-size: 10px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	user-select: none;
`;

const SmallerDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 22px;
	font-size: 10px;
`;

const HighlightP = styled.div`
	width: 22px;
	height: 14px;
	font-size: 10px;
	background-color: ${Pallete303.Black};
	color: ${Pallete303.ControlPanelColor};
	text-align: center;
	user-select: none;
`;

const TimeModeKeys = (props: TimeModeKeysProp) => {

  const determineActive = (mode: "pitch" | "time" | "normal", type: string, activePitch: Pitch) => {
		if (!activePitch) {
			return false
		}
    if (mode === "pitch") {
      if (type === "slide") {
        return activePitch.slide
      }
      if (type === "accent") {
        return activePitch.accent
      }
      if (type === "down" && activePitch.octave === -12) {
        return true
      } else if (type === "up" && activePitch.octave === 12) {
        return true
      } else {
        return false
      }
    }
    }

	return (
		<Group>
			<KeyDiv>
        <NameLabel>DOWN</NameLabel>
				<SwitchDiv>
					<LED active={determineActive(props.mode, "down", props.activePitch)} />
					<ButtonTB name={props.name}
          onClick={() => props.callbackFunction("down-or-note")} />
				</SwitchDiv>
				<Decor>{}</Decor>
				<SmallerDiv>
					<HighlightP>{props.numbers[0]}</HighlightP>
				</SmallerDiv>
			</KeyDiv>
			<KeyDiv>
        <NameLabel>UP</NameLabel>
				<SwitchDiv>
					<LED active={determineActive(props.mode, "up", props.activePitch)} />
					<ButtonTB name={props.name}
          onClick={() => props.callbackFunction("up-or-tie")} />
				</SwitchDiv>
				<Decor>{}</Decor>
				<SmallerDiv>
					<HighlightP>{props.numbers[1]}</HighlightP>
				</SmallerDiv>
			</KeyDiv>
      <KeyDiv>
        <NameLabel>ACCENT</NameLabel>
				<SwitchDiv>
					<LED active={determineActive(props.mode, "accent", props.activePitch)} />
					<ButtonTB name={props.name}
          onClick={() => props.callbackFunction("accent-or-a")} />
				</SwitchDiv>
				<Decor>{}</Decor>
				<SmallerDiv>
					<HighlightP>{props.numbers[2]}</HighlightP>
				</SmallerDiv>
			</KeyDiv>
      <KeyDiv>
        <NameLabel>SLIDE</NameLabel>
				<SwitchDiv>
					<LED active={determineActive(props.mode, "slide", props.activePitch)}/>
					<ButtonTB name={props.name}
          onClick={() => props.callbackFunction("slide-or-b")} />
				</SwitchDiv>
				<Decor>{}</Decor>
				<SmallerDiv>
					<HighlightP>{props.numbers[3]}</HighlightP>
				</SmallerDiv>
			</KeyDiv>
		</Group>
	);
};

interface TimeModeKeysProp {
  callbackFunction: (arg0: string) => void;
  activePitch: Pitch;
  mode: "pitch" | "time" | "normal";
	value: number;
	name: string;
	numbers: number[];
}

export { TimeModeKeys };
