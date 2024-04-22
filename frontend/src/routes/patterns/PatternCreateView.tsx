import { useEffect, useState } from 'react';
import { TextInput } from '../../components/TextInput';
import { useAuth } from '../../hooks/useAuth';
import { LED, ButtonTB, TimeModeControls, PitchNormalControls, Keyboard } from '../../components/303Components';
import {
	BorderContainer,
	ControlPanel,
	Label,
	ParentContainer,
	Text,
	TextContainer,
	VerticalContainer,
	ControlPanelFrame,

} from '../../components/303Components/303ControlPanel';

const PatternCreateView = (props: PatternCreateProps) => {
	const { user } = useAuth();
	const [name, setName] = useState(props.pattern.name);
	const [mode, setMode] = useState<"pitch" | "time" | "normal">("normal")
	const [pitchMode, setPitchMode] = useState<Pitch[]>([])
	// const [timeMode, setTimeMode] = useState<Time[]>([])
	const [activeIndex, setActiveIndex] = useState<number>(0)

	const advanceIndex = () => {
		setActiveIndex(activeIndex + 1);
		if (activeIndex >= 15) {
			setMode("normal");
		}
	}

	const randomPitch = (index: number) => {
		const getRandom = (range: number) => {
			return Math.floor(Math.random() * range)
		}
		const bool = [true, false];
		const octaves = [-12,0,12];

		const newPitch = {
			index: index,
			accent: bool[getRandom(2)],
			slide: bool[getRandom(2)],
			pitch: getRandom(12) + 36,
			octave: octaves[getRandom(3)],
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

	const handleTimeInput = (value: string) => {
		if (mode === "pitch") {
			console.log(value)
		} else if (mode === "time") {
			// Inputs the rhythm values
		} else {
			// Inputs for changing pattern sections
		}
	}

	return (
		<ParentContainer>
			<p>Posting as {user?.user.username}</p>
			<p>Current Index: {activeIndex}</p>
			<TextInput state={[name, setName]} />
			<label htmlFor="pitch-mode">Pitch Mode</label>
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
					<VerticalContainer>
						<Keyboard 
							callbackFunction={handlePitchInput}/>
					</VerticalContainer>
					{/* Time Mode */}
					<TimeModeControls
						activePitch={pitchMode[activeIndex]}
						callbackFunction={handleTimeInput}
						setMode={setMode}
						mode={mode}/>
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
		</ParentContainer>
	);
};

interface PatternCreateProps {
	pattern: Pattern;
}

export { PatternCreateView };
