import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LED, ButtonTB, TimeModeControls, PitchNormalControls, Keyboard, SecondPanel, FirstPanel } from '../../components/303Components';
import {
	BorderContainer,
	ControlPanel,
	Label,
	Text,
	TextContainer,
	VerticalContainer,
	ControlPanelFrame,
	MainCase,
	CenterFrame,
} from '../../components/303Components/303ControlPanel';

const PatternContext = createContext<PatternContext>({
	activeIndex: 0,
	pitchMode: [],
	timeMode: [],
	activeSection: "A",
	switchSections: () => {},
	mode: "normal",
	setMode: (string) => {string},
	handlePitchInput: (int) => {int},
	advanceIndex: () => {}
})

interface PatternContext {
	activeIndex: number;
	pitchMode: Pitch[];
	timeMode: Time[];
	activeSection: "A" | "B";
	mode: "pitch" | "time" | "normal",
	setMode: Dispatch<SetStateAction<"pitch" | "time" | "normal">>,
	switchSections: (section: "A" | "B") =>  void;
	handlePitchInput: (int: number) => void;
	advanceIndex: () => void;
}

const PatternCreateView = (props: PatternCreateProps) => {
	const { user } = useAuth();
	const [name, setName] = useState(props.pattern? props.pattern.name : `${user}'s New Pattern`);
	const [mode, setMode] = useState<"pitch" | "time" | "normal">("normal")
	const [sections, setSections] = useState<[Section, Section]>(props.pattern? props.pattern.sections : [{ name: "A", time_mode: [], pitch_mode: []}, { name: "B", time_mode: [], pitch_mode: []}])
	const [activeSection, setActiveSection] = useState<"A" | "B">("A")
	const [pitchMode, setPitchMode] = useState<Pitch[]>([])
	const [timeMode, setTimeMode] = useState<Time[]>([])
	const [activeIndex, setActiveIndex] = useState<number>(0)

	const switchSections = (sectionToSwitchTo: "A" | "B") => {
		setActiveSection(sectionToSwitchTo)
		let currentName: "A" | "B" = "A";
		let currentIndex: number = 0;
		let newIndex = 1
		if (sectionToSwitchTo === "A") {
			currentName = "B"
			currentIndex = 1
			newIndex = 0
		}
		const currentSection: Section = {
			name: currentName,
			time_mode: timeMode,
			pitch_mode: pitchMode,
		}
		const newSections: [Section, Section] = [sections[0], sections[1]]
		newSections[currentIndex] = currentSection;
		setSections(newSections)
		setTimeMode(sections[newIndex].time_mode)
		setPitchMode(sections[newIndex].pitch_mode)
	}

	const advanceIndex = () => {
		setActiveIndex(activeIndex + 1);
		if (activeIndex >= 15) {
			setMode("normal");
		}
	}

	const reverseIndex = () => {
		if (activeIndex != 0) {
			setActiveIndex(activeIndex - 1);
		}
	}

	const randomPitch = (index: number) => {
		const getRandom = (range: number) => {
			return Math.floor(Math.random() * range)
		}

		const newPitch = {
			index: index,
			accent: false,
			slide: false,
			pitch: getRandom(12) + 36,
			octave: 0,
		}
		return newPitch as Pitch
	}

	useEffect(() => {
		setActiveIndex(0)
		if (pitchMode.length < 16 && pitchMode.length > 1) {
			const newArray = [];
			let index = pitchMode.length;
			while (newArray.length < (16 - pitchMode.length)) {
				newArray.push(randomPitch(index));
				index++;
			}
			setPitchMode([...pitchMode, ...newArray])
		}
	}, [mode])

	const handlePitchInput = (value: number) => {
		if (mode === "pitch") {
				let newPitch: Pitch;
				if (pitchMode[activeIndex]) {
					const newPitch = {...pitchMode[activeIndex], pitch: value}
					const newPitchArray = [...pitchMode]
					newPitchArray[activeIndex] = newPitch;
					setPitchMode(newPitchArray);
				} else {
					newPitch = {
						index: activeIndex,
						accent: false,
						slide: false,
						pitch: value,
						octave: 0,
					};
					setPitchMode([...pitchMode, newPitch]);
				}
				console.log(pitchMode)
				advanceIndex()
		}
	}

	return (
		<CenterFrame>
			<PatternContext.Provider value={{ 
				activeIndex: activeIndex,
				pitchMode: pitchMode,
				timeMode: timeMode,
				mode: mode,
				setMode: setMode,
				switchSections: switchSections,
				handlePitchInput: handlePitchInput,
				advanceIndex: advanceIndex,
				activeSection: activeSection}}>
					<MainCase>
						<FirstPanel />
						<SecondPanel />
							<ControlPanelFrame>
								<ControlPanel>
									{/* Left Most Controls */}
									<VerticalContainer>
										<BorderContainer $small>
											<TextContainer>
												<Text>D.C.</Text>
												<Text>BAR RESET</Text>
											</TextContainer>
											<Label
												htmlFor="pattern-clear"
												$small>
												PATTERN CLEAR
											</Label>
											<ButtonTB
												name="pattern-clear"
												horizontal={true}
											/>
										</BorderContainer>
										<BorderContainer>
											<LED active={true} />
											<ButtonTB
												name="run-stop"
												large={true}
											/>
											<Label
												htmlFor="run-stop"
												$extraMargin>
												Run / Stop
											</Label>
										</BorderContainer>
									</VerticalContainer>
									{/* Second from left controls */}
									<PitchNormalControls 
										setMode={setMode}
										mode={mode}/>
									{/* Keyboard */}
										<Keyboard 
											callbackFunction={handlePitchInput}/>
									{/* Time Mode */}
									<TimeModeControls />
									{/* Furthest right controls */}
									<VerticalContainer>
										<BorderContainer $small>
											<TextContainer>
												<Text
													$padding={0}
													$fontSize={12}>
													{'\u{1D10B}'}
												</Text>
											</TextContainer>
											<Label
												htmlFor="back"
												$small>
												BACK
											</Label>
											<ButtonTB
												name="back"
												horizontal={true}
												onClick={reverseIndex}
											/>
										</BorderContainer>
										<BorderContainer>
											<TextContainer>
												<Text>D.S.</Text>
											</TextContainer>
											<ButtonTB
												name="run-stop"
												large={true}
												onClick={advanceIndex}
											/>
											<Label
												$extraMargin
												$border>
												Write / Next
											</Label>
											<Text $noBorder $fontSize={10}>Tap</Text>
										</BorderContainer>
									</VerticalContainer>
								</ControlPanel>
							</ControlPanelFrame>
					</MainCase>
			</PatternContext.Provider>
		</CenterFrame>
	);
};

interface PatternCreateProps {
	pattern?: Pattern;
}

export { PatternCreateView, PatternContext };
