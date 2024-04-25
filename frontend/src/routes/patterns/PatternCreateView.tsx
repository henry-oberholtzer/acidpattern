import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ButtonTB, TimeModeControls, PitchNormalControls, Keyboard, SecondPanel, FirstPanel, PatternForm, ClearRunControls } from '../../components/303Components';
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
	mode: { set: (string) => {string}, get: "normal"},
	name: { set: (string) => {string}, get: "normal"},
	index: { next: () => {}, back: () => {}, current: 0},
	waveform: { set: (string) => {string}, get: "saw"},
	tuning: { set: (number) => {number}, get: 63},
	cutoff: { set: (number) => {number}, get: 63},
	decay: { set: (number) => {number}, get: 63},
	resonance: { set: (number) => {number}, get: 63},
	envMod: { set: (number) => {number}, get: 63},
	accent: { set: (number) => {number}, get: 63},
	tempo: { set: (number) => {number}, get: 63},
	volume: { set: (number) => {number}, get: 63},
	run: { set: (bool) => {bool}, get: false},
	handlePitchInput: (int) => {int},
	advanceIndex: () => {}
})

interface PatternContext {
	activeIndex: number;
	pitchMode: Pitch[];
	timeMode: Time[];
	activeSection: "A" | "B";
	switchSections: (section: "A" | "B") =>  void;
	handlePitchInput: (int: number) => void;
	advanceIndex: () => void;
	index: { next: () => void, back: () => void, current: number},
	mode: { set: Dispatch<SetStateAction<"pitch" | "time" | "normal">>, get: "pitch" | "time" | "normal"},
	name: { set: Dispatch<SetStateAction<string>>, get: string},
	waveform: { set: Dispatch<SetStateAction<"saw" | "square">>, get: "saw" | "square" },
	tuning: { set: Dispatch<SetStateAction<number>>, get: number},
	cutoff: { set: Dispatch<SetStateAction<number>>, get: number},
	resonance: { set: Dispatch<SetStateAction<number>>, get: number},
	decay: { set: Dispatch<SetStateAction<number>>, get: number},
	envMod: { set: Dispatch<SetStateAction<number>>, get: number},
	accent: { set: Dispatch<SetStateAction<number>>, get: number},
	tempo: { set: Dispatch<SetStateAction<number>>, get: number},
	volume: { set: Dispatch<SetStateAction<number>>, get: number},
	run: { set: Dispatch<SetStateAction<boolean>>, get: boolean},
}

const PatternCreateView = (props: PatternCreateProps) => {
	const { user } = useAuth();
	const [name, setName] = useState(props.pattern? props.pattern.name : `${user?.user.username}'s New Pattern`);
	const [mode, setMode] = useState<"pitch" | "time" | "normal">("normal")
	const [sections, setSections] = useState<[Section, Section]>(props.pattern? props.pattern.sections : [{ name: "A", time_mode: [], pitch_mode: []}, { name: "B", time_mode: [], pitch_mode: []}])
	const [activeSection, setActiveSection] = useState<"A" | "B">("A")
	const [pitchMode, setPitchMode] = useState<Pitch[]>([])
	const [timeMode, setTimeMode] = useState<Time[]>([])
	const [activeIndex, setActiveIndex] = useState<number>(0)
	// Settings state
	const [waveform, setWaveform] = useState<"saw" | "square">("saw")

	const [tuning, setTuning] = useState<number>(0)
	const [cutOffFreq, setCutoffFreq] = useState<number>(63)
	const [resonance, setResonance] = useState<number>(63)
	const [envMod, setEnvMod] = useState<number>(63)
	const [decay, setDecay] = useState<number>(63)
	const [accent, setAccent] = useState<number>(63)
	// Second panel settings
	const [tempo, setTempo] = useState<number>(130)
	const [volume, setVolume] = useState<number>(127)
	// Transport
	const [run, setRun] = useState<boolean>(false)


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
				index: { next: advanceIndex, back: reverseIndex, current: activeIndex},
				mode: { set: setMode, get: mode},
				name: { set: setName, get: name},
				run: {set: setRun, get: run},
				waveform: { set: setWaveform, get: waveform},
				tuning: { set: setTuning, get: tuning},
				cutoff: { set: setCutoffFreq, get: cutOffFreq},
				decay: { set: setDecay, get: decay},
				resonance: { set: setResonance, get: resonance},
				envMod: { set: setEnvMod, get: envMod},
				accent: { set: setAccent, get: accent},
				tempo: { set: setTempo, get: tempo},
				volume: { set: setVolume, get: volume},
				switchSections: switchSections,
				handlePitchInput: handlePitchInput,
				advanceIndex: advanceIndex,
				activeSection: activeSection}}>
					<PatternForm />
					<MainCase>
						<FirstPanel />
						<SecondPanel />
							<ControlPanelFrame>
								<ControlPanel>
									{/* Left Most Controls */}
									<ClearRunControls />
									{/* Second from left controls */}
									<PitchNormalControls />
									{/* Keyboard */}
										<Keyboard />
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
