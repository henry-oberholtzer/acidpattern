import styled from 'styled-components';
import { ButtonTB, LED } from '.';
import { Pallete303 } from './Palette';
import { PatternContext } from '../../routes/patterns/PatternCreateView';
import { useContext } from 'react';

const Group = styled.div`
	width: 240px;
	height: 152px;
	display: flex;
`;

const KeyDiv = styled.div`
	width: 60px;
	height: 152px;
	display: flex;
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

const TimeModeKeys = () => {
	const { activeIndex, timeMode, pitchMode, mode, activeSection, switchSections } = useContext(PatternContext)

  const determineActive = (type: string) => {
    if (mode.get === "pitch" && pitchMode[activeIndex]) {
      if (type === "slide") {
        return pitchMode[activeIndex].slide
      }
      if (type === "accent") {
        return pitchMode[activeIndex].accent
      }
      if (type === "down" && pitchMode[activeIndex].octave === -12) {
        return true
      } else if (type === "up" && pitchMode[activeIndex].octave === 12) {
        return true
      } else {
        return false
      }
    } else if (mode.get === "time" && timeMode[activeIndex]) {
			if (type === "down" && timeMode[activeIndex].timing === 1) {
				return true
			} else if (type === "up" && timeMode[activeIndex].timing === 2) {
				return true
			} else if (type === "accent" && timeMode[activeIndex].timing === 0) {
				return true
			} else {
				return false
			}
		} else if (mode.get === "normal") {
			if (type === "accent" && activeSection === "A") {
				return true
			} else if (type === "slide" && activeSection === "B") {
				return true
			} else {
				return false
			}
		}
  }

	const switchAction = (type: string) => {
		if (mode.get === "pitch") {
			// Change the properties accordingly for the current note
			// Apply the new setting
			// Play the new note.
		} else if (mode.get === "time") {
			// Create or alter the time accordingly
		} else if (mode.get === "normal") {
			if (type === "accent") {
				switchSections("A")
			} else if (type === "slide") {
				switchSections("B")
			}
		}
	}

	return (
		<Group>
			<KeyDiv>
        <NameLabel>DOWN</NameLabel>
				<SwitchDiv>
					<LED active={determineActive("down")} />
					<ButtonTB name="down"
          onClick={() => switchAction("down")} />
				</SwitchDiv>
				<Decor>{}</Decor>
				<SmallerDiv>
					<HighlightP>9</HighlightP>
				</SmallerDiv>
			</KeyDiv>
			<KeyDiv>
        <NameLabel>UP</NameLabel>
				<SwitchDiv>
					<LED active={determineActive("up")} />
					<ButtonTB name="up"
          onClick={() => switchAction("up")} />
				</SwitchDiv>
				<Decor>{}</Decor>
				<SmallerDiv>
					<HighlightP>0</HighlightP>
				</SmallerDiv>
			</KeyDiv>
      <KeyDiv>
        <NameLabel>ACCENT</NameLabel>
				<SwitchDiv>
					<LED active={determineActive("accent")} />
					<ButtonTB name="accent"
          onClick={() => switchAction("accent")} />
				</SwitchDiv>
				<Decor>{}</Decor>
				<SmallerDiv>
					<HighlightP>100</HighlightP>
				</SmallerDiv>
			</KeyDiv>
      <KeyDiv>
        <NameLabel>SLIDE</NameLabel>
				<SwitchDiv>
					<LED active={determineActive("slide")}/>
					<ButtonTB name="slide"
          onClick={() => switchAction("slide")} />
				</SwitchDiv>
				<Decor>{}</Decor>
				<SmallerDiv>
					<HighlightP>200</HighlightP>
				</SmallerDiv>
			</KeyDiv>
		</Group>
	);
};

export { TimeModeKeys };
