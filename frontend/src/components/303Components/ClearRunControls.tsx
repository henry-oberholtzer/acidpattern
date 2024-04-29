import { PatternContext } from '../../routes/patterns/PatternCreateView';
import {
	BorderContainer,
	Label,
	TextContainer,
	VerticalContainer,
	Text,
} from './303ControlPanel';
import { ButtonTB } from './ButtonTB';
import { LED } from './LED';
import { useContext, useEffect } from 'react';

const ClearRunControls = () => {
	const { mode, run, } = useContext(PatternContext);

	const handleRun = () => {
		if (mode.get === 'normal') {
			run.set(!run.get);
		}
	};



	useEffect(() => {
		if (mode.get !== 'normal') {
			run.set(false);
		}
	}, [mode, run]);

	return (
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
				<LED active={run.get} />
				<ButtonTB
					name="run-stop"
					large={true}
					onClick={handleRun}
				/>
				<Label
					htmlFor="run-stop"
					$extraMargin>
					Run / Stop
				</Label>
			</BorderContainer>
		</VerticalContainer>
	);
};

export { ClearRunControls };