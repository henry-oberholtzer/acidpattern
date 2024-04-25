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
	const {
		timeMode,
		pitchMode,
		mode,
		activeSection,
		index,
		switchSections,
	} = useContext(PatternContext);

	const determineActive = (type: string) => {
		if (mode.get === 'pitch' && pitchMode.get[index.current]) {
			if (type === 'slide') {
				return pitchMode.get[index.current].slide;
			}
			if (type === 'accent') {
				return pitchMode.get[index.current].accent;
			}
			if (type === 'down' && pitchMode.get[index.current].octave === -12) {
				return true;
			} else if (type === 'up' && pitchMode.get[index.current].octave === 12) {
				return true;
			} else {
				return false;
			}
		} else if (mode.get === 'time' && timeMode.get[index.current]) {
			if (type === 'down' && timeMode.get[index.current].timing === 1) {
				return true;
			} else if (type === 'up' && timeMode.get[index.current].timing === 2) {
				return true;
			} else if (type === 'accent' && timeMode.get[index.current].timing === 0) {
				return true;
			} else {
				return false;
			}
		} else if (mode.get === 'normal') {
			if (type === 'accent' && activeSection === 'A') {
				return true;
			} else if (type === 'slide' && activeSection === 'B') {
				return true;
			} else {
				return false;
			}
		}
	};

	const switchAction = (type: string) => {
		if (mode.get === 'pitch') {
			const currentNote: Pitch = pitchMode.get[index.current];
			switch (type) {
				case 'accent':
					currentNote.accent = !currentNote.accent;
					break;
				case 'slide':
					currentNote.slide = !currentNote.slide;
					break;
				case 'up':
					currentNote.octave = currentNote.octave === 12 ? 0 : 12;
					break;
				case 'down':
					currentNote.octave = currentNote.octave === -12 ? 0 : -12;
					break;
			}
			const newPitchArray = [...pitchMode.get];
			newPitchArray[index.current] = currentNote;
			pitchMode.set(newPitchArray);
		} else if (mode.get === 'time') {
			const timeValue =
				type === 'down' ? 1 : type === 'up' ? 2 : type === 'accent' ? 0 : null;
			if (timeValue) {
				const newTime: Time = {
					index: index.current,
					timing: timeValue,
				};
				if (timeMode.get[index.current]) {
					const newTimeMode = [...timeMode.get];
					newTimeMode[index.current] = newTime;
					timeMode.set(newTimeMode);
				} else {
					timeMode.set([...timeMode.get, newTime]);
				}
			}
			index.next()
		} else if (mode.get === 'normal') {
			if (type === 'accent') {
				switchSections('A');
			} else if (type === 'slide') {
				switchSections('B');
			}
		}
	};

	return (
		<Group>
			<KeyDiv>
				<NameLabel>DOWN</NameLabel>
				<SwitchDiv>
					<LED active={determineActive('down')} />
					<ButtonTB
						name="down"
						onClick={() => switchAction('down')}
					/>
				</SwitchDiv>
				<Decor>{}</Decor>
				<SmallerDiv>
					<HighlightP>9</HighlightP>
				</SmallerDiv>
			</KeyDiv>
			<KeyDiv>
				<NameLabel>UP</NameLabel>
				<SwitchDiv>
					<LED active={determineActive('up')} />
					<ButtonTB
						name="up"
						onClick={() => switchAction('up')}
					/>
				</SwitchDiv>
				<Decor>{}</Decor>
				<SmallerDiv>
					<HighlightP>0</HighlightP>
				</SmallerDiv>
			</KeyDiv>
			<KeyDiv>
				<NameLabel>ACCENT</NameLabel>
				<SwitchDiv>
					<LED active={determineActive('accent')} />
					<ButtonTB
						name="accent"
						onClick={() => switchAction('accent')}
					/>
				</SwitchDiv>
				<Decor>{}</Decor>
				<SmallerDiv>
					<HighlightP>100</HighlightP>
				</SmallerDiv>
			</KeyDiv>
			<KeyDiv>
				<NameLabel>SLIDE</NameLabel>
				<SwitchDiv>
					<LED active={determineActive('slide')} />
					<ButtonTB
						name="slide"
						onClick={() => switchAction('slide')}
					/>
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
