import {
	BackNextControls,
	ClearRunControls,
	ControlPanel,
	ControlPanelFrame,
	FirstPanel,
	Keyboard,
	MainCase,
	PitchNormalControls,
	SecondPanel,
	TimeModeControls,
} from './303Components';

const TB303 = () => {
	return (
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
					<BackNextControls />
				</ControlPanel>
			</ControlPanelFrame>
		</MainCase>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export { TB303 }
