import { useState } from 'react';
import { TextInput } from '../../components/TextInput';
import { useAuth } from '../../hooks/useAuth';
import { LED, ButtonTB } from '../../components/303Components';
import {
	BorderContainer,
	ControlPanel,
	Label,
	ParentContainer,
	Text,
	TextContainer,
	VerticalContainer,
} from '../../components/303Components/303ControlPanel';

const PatternCreateView = (props: PatternCreateProps) => {
	const { user } = useAuth();
	const [name, setName] = useState(props.pattern.name);
	const [pitchMode, setPitchMode] = useState<boolean>(true);

	return (
		<ParentContainer>
			<p>Posting as {user?.user.username}</p>
			<TextInput state={[name, setName]} />
			<label htmlFor="pitch-mode">Pitch Mode</label>

			<ButtonTB
				name="run-stop"
				large={true}
			/>
			<label htmlFor="time-mode">Time Mode</label>
			<LED active={!pitchMode} />
			<ButtonTB
				name="enable-time-mode"
				horizontal={true}
				onClick={() => setPitchMode(false)}
			/>
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
							<Label htmlFor="run-stop" $extraMargin>Run / Stop</Label>
					</BorderContainer>
				</VerticalContainer>
				{/* Second from left controls */}
				<VerticalContainer>
					<BorderContainer
						$small
						$filled>
						<TextContainer>
							<Label
								htmlFor="enable-pitch-mode"
								$silver>
								PITCH MODE
							</Label>
						</TextContainer>
						<LED active={pitchMode} />
						<ButtonTB
							horizontal={true}
							name="enable-pitch-mode"
							onClick={() => setPitchMode(true)}
						/>
					</BorderContainer>
					<BorderContainer>

					</BorderContainer>
				</VerticalContainer>
				{/* Furthest right controls */}
				<VerticalContainer>
					<BorderContainer $small>
						<TextContainer>
							<Text $padding={"0px"} $fontSize={"12px"}>{'\u{1D10B}'}</Text>
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
						/>
						<Label $extraMargin $border>Write / Next</Label>
						<Text>Tap</Text>
					</BorderContainer>
				</VerticalContainer>
			</ControlPanel>
		</ParentContainer>
	);
};

interface PatternCreateProps {
	pattern: Pattern;
}

export { PatternCreateView };
