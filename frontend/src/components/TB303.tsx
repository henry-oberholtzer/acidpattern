import styled from 'styled-components';
import {
	BackNextControls,
	ClearRunControls,
	ControlPanel,
	ControlPanelFrame,
	FirstPanel,
	Keyboard,
	PitchNormalControls,
	SecondPanel,
	TimeModeControls,
} from './303Components';
import { Pallete303 } from './303Components/Palette';

const MainCase = styled.div`
  font-family: 'Inter';
  width: 1080px;
  height: 520px;
  background-image: radial-gradient(${Pallete303.CaseSilver}, ${Pallete303.CaseShadow} 20%, ${Pallete303.CaseSilver});
  background-color: ${Pallete303.CaseSilver};
  padding-top: 3px;
  border-radius: 3px;
  box-shadow: 3px 3px 30px ${Pallete303.CaseShadow}, -3px -3px 30px ${Pallete303.CaseShadow};`

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
