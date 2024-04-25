import { useContext } from 'react';
import { PatternContext } from '../../routes/patterns/PatternCreateView';
import styled from 'styled-components';
import { Pallete303 } from './Palette';

const SwitchContainer = styled.div`
	width: ${22 + 22 + 12}px;
	height: ${22}px;
	display: flex;
	justify-content: space-between;
`;

const WaveformSwitch = () => {
	const { waveform } = useContext(PatternContext);

	return (
		<SwitchContainer>
			<svg
				width="22"
				height="12"
				viewBox="0 0 5.8208332 3.1749999"
				version="1.1"
				id="svg1"
				xmlSpace="preserve"
				xmlns="http://www.w3.org/2000/svg">
				<defs id="defs1" />
				<path
					fill="none"
					stroke={Pallete303.Black}
					strokeWidth={0.529167}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeOpacity="1"
					d="M 0.52916664,2.6458332 V 0.52916664 L 2.9104165,2.6458332 V 0.52916664 L 5.2916664,2.6458332"
					id="SAW"
				/>
			</svg>
			<svg
				width="22"
				height="12"
				viewBox="0 0 5.8208332 3.1749999"
				version="1.1"
				id="svg1"
				xmlSpace="preserve"
				xmlns="http://www.w3.org/2000/svg">
				<defs id="defs1" />
				<g id="layer1">
					<path
						fill="none"
            stroke={Pallete303.Black}
            strokeWidth={0.529167}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="1"
						d="m 0.52916663,2.6458332 1e-8,-2.11666656 H 1.8520832 V 2.6458332 H 3.1749998 V 0.52916664 H 4.4979164 V 2.6458332 h 0.7937499"
						id="square"
					/>
				</g>
			</svg>
		</SwitchContainer>
	);
};

export { WaveformSwitch }
