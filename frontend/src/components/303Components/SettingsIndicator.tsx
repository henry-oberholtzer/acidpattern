import styled from 'styled-components';
import settingsDial from './svgs/settings_dial.svg';

const SettingsMarker = styled.div`
	width: 60px;
	position: fixed;
	height: 60px;
	margin: 5px;
	background-image: url(${settingsDial});
	background-position: center;
	background-size: contain;
`;

const SettingsIndicator = (props: SettingsIndicatorProps) => {
	const rotate = () => {
    const step = (330 - 30) / props.steps;
    return 30 + step * (props.value - props.min)
  }

	return (
		<div>
			<SettingsMarker />
			<svg
				width="70"
				height="70"
				version="1.1"
				viewBox="0 0 15.875 15.875"
				xmlns="http://www.w3.org/2000/svg"
				transform={`rotate(${rotate() - 180}, 0, 0)`}
      transform-origion="center">
				<path
					d="m7.9375 7.9375v-5.2917"
					fill="#d40000"
					stroke="#d40000"
					stroke-linecap="round"
					stroke-width="1"
				/>
			</svg>
		</div>
	);
};

interface SettingsIndicatorProps {
	value: number,
	min: number,
	max: number,
	steps: number,
}


export { SettingsIndicator };
