import styled from 'styled-components';
import { ButtonTB, LED } from '.';
import { Pallete303 } from './Palette';
import { PatternContext } from '../../routes/patterns/PatternCreateView';
import { useContext, useState } from 'react';

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

const SwitchDiv = styled.div<{ $octave?: boolean}>`
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: center;
	width: 100%;
	height: 84px;
	${props => props.$octave ? "border-radius: 0px;" : "border-radius: 0 0 4px 4px;"}
	border: 1px solid ${Pallete303.Black};
	${props => props.$octave ? "border-bottom: 0;" : ""}
	padding: 4px 6px 6px 6px;
`;

const Decor = styled.div<{ $silver?: boolean }>`
	background-color: ${props => props.$silver ? Pallete303.ControlPanelColor : Pallete303.Black};
	color: ${props => props.$silver ? Pallete303.Black : Pallete303.LEDRedActive};
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
	const { timeMode, pitchMode, mode, activeSection, index, sections } =
		useContext(PatternContext);
	const [downActive, setDownActive] = useState<boolean>(false);
	const [upActive, setUpActive] = useState<boolean>(false);
	const [accentActive, setAccentActive] = useState<boolean>(false);
	const [slideActive, setSlideActive] = useState<boolean>(false);

	const onMouseUp = (action: React.Dispatch<React.SetStateAction<boolean>>) => {
		action(false);
		if (mode.get === 'time') {
			index.next();
		}
	};

	const switchSections = (sectionToSwitchTo: 'A' | 'B') => {
		activeSection.set(sectionToSwitchTo);
		let currentName: 'A' | 'B' = 'A';
		let currentIndex: number = 0;
		let newIndex = 1;
		if (sectionToSwitchTo === 'A') {
			currentName = 'B';
			currentIndex = 1;
			newIndex = 0;
		}
		const currentSection: Section = {
			name: currentName,
			time_mode: timeMode.get,
			pitch_mode: pitchMode.get,
		};
		const newSections: [Section, Section] = [sections.get[0], sections.get[1]];
		newSections[currentIndex] = currentSection;
		sections.set(newSections);
		timeMode.set(sections.get[newIndex].time_mode);
		pitchMode.set(sections.get[newIndex].pitch_mode);
	};

	const switchAction = (type: string) => {
		if (mode.get === 'pitch') {
			const currentNote: Pitch = pitchMode.get[index.current];
			if (currentNote) {
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
			}
		} else if (mode.get === 'time') {
			const timeValue =
				type === 'down' ? 1 : type === 'up' ? 2 : type === 'accent' ? 0 : null;
			if (timeValue != null) {
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
			console.log(timeMode.get)
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
				<SwitchDiv $octave>
					<LED
						active={
							downActive ||
							(mode.get === 'pitch' &&
								pitchMode.get[index.current]?.octave === -12) ||
							(mode.get === 'time' && timeMode.get[index.current]?.timing === 1)
						}
					/>
					<ButtonTB
						name="down"
						onMouseDown={() => {
							setDownActive(true);
							switchAction('down');
						}}
						onMouseUp={() => onMouseUp(setDownActive)}
					/>
				</SwitchDiv>
				<Decor $silver>STEP</Decor>
				<SmallerDiv>
					<HighlightP>9</HighlightP>
				</SmallerDiv>
			</KeyDiv>
			<KeyDiv>
				<NameLabel>UP</NameLabel>
				<SwitchDiv $octave>
					<LED
						active={
							upActive ||
							(mode.get === 'pitch' &&
								pitchMode.get[index.current]?.octave === 12) ||
							(mode.get === 'time' && timeMode.get[index.current]?.timing === 2)
						}
					/>
					<ButtonTB
						name="up"
						onMouseDown={() => {
							setUpActive(true);
							switchAction('up');
						}}
						onMouseUp={() => onMouseUp(setUpActive)}
					/>
				</SwitchDiv>
				<Decor $silver>{}</Decor>
				<SmallerDiv>
					<HighlightP>0</HighlightP>
				</SmallerDiv>
			</KeyDiv>
			<KeyDiv>
				<NameLabel>ACCENT</NameLabel>
				<SwitchDiv>
					<LED
						active={
							accentActive ||
							(mode.get === 'pitch' &&
								pitchMode.get[index.current]?.accent === true) ||
							(mode.get === 'time' &&
								timeMode.get[index.current]?.timing === 0) ||
							(mode.get === 'normal' && activeSection.get === 'A')
						}
					/>
					<ButtonTB
						name="accent"
						onMouseDown={() => {
							setAccentActive(true);
							switchAction('accent');
						}}
						onMouseUp={() => onMouseUp(setAccentActive)}
					/>
				</SwitchDiv>
				<Decor>A</Decor>
				<SmallerDiv>
					<HighlightP>100</HighlightP>
				</SmallerDiv>
			</KeyDiv>
			<KeyDiv>
				<NameLabel>SLIDE</NameLabel>
				<SwitchDiv>
					<LED
						active={
							mode.get === 'time'
								? false
								: slideActive ||
								(mode.get === 'pitch' &&
										pitchMode.get[index.current]?.slide === true) ||
								(mode.get === 'normal' && activeSection.get === 'B')
						}
					/>
					<ButtonTB
						name="slide"
						onMouseDown={() => {
							setSlideActive(true);
							switchAction('slide');
						}}
						onMouseUp={() => onMouseUp(setSlideActive)}
					/>
				</SwitchDiv>
				<Decor>B</Decor>
				<SmallerDiv>
					<HighlightP>200</HighlightP>
				</SmallerDiv>
			</KeyDiv>
		</Group>
	);
};

export { TimeModeKeys };
