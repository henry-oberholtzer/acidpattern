import styled from 'styled-components';

import saw_wave_active from "./svgs/saw_wave_active.svg"
import saw_wave_inactive from "./svgs/saw_wave_inactive.svg"
import square_wave_active from "./svgs/square_wave_active.svg"
import square_wave_inactive from "./svgs/square_wave_inactive.svg"
import { Pallete303 } from './Palette';
import { Carat, Label } from './Containers';
import { usePattern } from '../../hooks';

const SwitchContainer = styled.button`
	margin-top: 2px;
	padding: 0px;
	cursor: pointer;
	background-color: transparent;
	border: 0;
	width: ${22 + 22 + 12}px;
	height: ${10}px;
	display: flex;
	justify-content: space-between;
`;

const Saw = styled.div<{$active: boolean}>`
	width: 20px;
	height: 10px;
	clip-path: url(${saw_wave_active});
	background-image: url(${props => props.$active ? saw_wave_active : saw_wave_inactive});
	${props => props.$active ? `filter: drop-shadow(0 0 6px ${Pallete303.LEDRedActive});` : ""}`

const Square = styled.div<{$active: boolean}>`
	width: 20px;
	height: 10px;
	clip-path: url(${square_wave_active});
	background-image: url(${props => props.$active ? square_wave_active : square_wave_inactive});
	${props => props.$active ? `filter: drop-shadow(0 0 6px ${Pallete303.LEDRedActive});` : ""}`

const SwitchDiv = styled.div`
	height: 22px;
	display: flex;
	flex-direction: column;`

const WaveformSwitch = () => {
	const { waveform, synth } = usePattern();

	const handleWaveform = () => {
		if (waveform.get === "saw") {
			waveform.set("square")
			if (synth?.current) {
				synth.current.adjustWaveform("square")
			}
		} else
		{
			waveform.set("saw")
			if (synth?.current) {
				synth.current.adjustWaveform("saw")
			}
		}
	}

	return (
		<SwitchDiv>
		<SwitchContainer
			name="waveform"
			onClick={handleWaveform}>
			<Saw $active={waveform.get === "saw"}/>
			<Carat />
			<Square $active={waveform.get === "square"} />
		</SwitchContainer>
			<Label htmlFor="name" $height={12} $small>WAVEFORM</Label>
		</SwitchDiv>
	);
};

export { WaveformSwitch }
