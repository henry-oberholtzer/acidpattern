import { useState } from 'react';
import { TextInput } from '../../components/TextInput';
import { useAuth } from '../../hooks/useAuth';
import { LED, ButtonTB } from '../../components/303Components';
import {
	BorderContainer,
	ControlPanel,
	VerticalContainer,
} from '../../components/303Components/303ControlPanel';

const PatternCreateView = (props: PatternCreateProps) => {
	const { user } = useAuth();
	const [name, setName] = useState(props.pattern.name);
	const [pitchMode, setPitchMode] = useState<boolean>(true);

	return (
		<>
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
				<VerticalContainer>
					<BorderContainer $small>
						<label htmlFor="pattern-clear">PATTERN CLEAR</label>
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
						<label htmlFor="run-stop">Run / Stop</label>
					</BorderContainer>
				</VerticalContainer>
				<VerticalContainer>
					<BorderContainer $small>
            <label htmlFor="enable-pitch-mode">PITCH MODE</label>
						<LED active={pitchMode} />
						<ButtonTB
							horizontal={true}
							name="enable-pitch-mode"
							onClick={() => setPitchMode(true)}
						/>
					</BorderContainer>
				</VerticalContainer>
			</ControlPanel>
		</>
	);
};

interface PatternCreateProps {
	pattern: Pattern;
}

export { PatternCreateView };
